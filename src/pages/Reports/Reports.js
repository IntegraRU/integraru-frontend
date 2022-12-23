import styles from "./Reports.module.css";
import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { AiFillStar } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import Meal from '../../assets/food.png';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts'
import { Carousel } from 'react-responsive-carousel';
import { format, isAfter, isBefore, parse } from 'date-fns'
import api from '../../services/api';
import { useCallback } from "react";

const horariosCafe = ['07:00', '07:30', '08:00', '08:30', '09:00'];
const horariosAlmoco = ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
const horariosJantar = ['17:00', '17:30', '18:00', '18:30', '19:00'];

export default function Reports() {
    const [allMenus, setAllMenus] = useState([]);
    const [currentMenu, setCurrentMenu] = useState(0);
    const [currentComment, setCurrentComment] = useState(0);
    const [menuInfo, setMenuInfo] = useState();

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await api().get('/pratos', {
                    params: {
                        date: format(new Date(), 'dd/MM/yyyy')
                    }
                });
                setAllMenus(response.data);
            } catch (e) {
                alert(e);
            }
        }
        fetchMenus();
    }, []);

    useEffect(() => {
        const fetchMenuInfo = async () => {
            try {
                if (allMenus[currentMenu]) {
                    const response = await api().get(`/relatorio/${allMenus[currentMenu].id}`);
                    if (response.data) setMenuInfo(response.data);
                }
            } catch (e) {
                alert(e);
            }
        }
        fetchMenuInfo();
    }, [allMenus, currentMenu]);

    const buildDataAvaliacao = useCallback(()=>{
        const result = [];
        // Gera um array de objetos que tem {nota: 1, qtd: 3, remain: 15}. O remain é usado para mostrar a barra cinza
        // em cima da barra de notas
        Array.from(Array(5)).forEach(i => {
            result[i] = {
                nota: i+1,
                qtd: menuInfo?.avaliacoesQuant.filter(a => a === i+1).length || 0
            }
            result[i].remain = menuInfo.avaliacoesQuant.length - result[i].qtd
        });
        return result;
    }, [menuInfo?.avaliacoesQuant]);
    
    const buildDataHorarios = useCallback(()=>{
        const result = [];
        const horarios = allMenus[currentMenu].modalidadePrato === 'CAFE' ? horariosCafe :
                         allMenus[currentMenu].modalidadePrato === 'ALMOCO' ? horariosAlmoco : horariosJantar;
        // Dada a lista de horários e checkouts, busca a quantidade de checkouts no intervalo de 30min
        // por exemplo, de 11:30 a 12:00 (i, i+1), pega todos os checkouts, independente do dia, entre esse horário.
        const horariosParsed = horarios.map(horario => parse(horario, 'HH:mm', new Date()));
        const checkouts = menuInfo.checkouts.map(horario => parse(horario, 'HH:mm', new Date()));
        for(let i=0; i < horarios.length - 1; i++){
            const qtd = checkouts.filter(checkout => isAfter(checkout, horariosParsed[i]) && isBefore(checkout, horariosParsed[i+1])).length;
            result[i] = {
                time: horarios[i],
                qtd
            }
        }
        // CASO A LÓGICA ACIMA NÃO FUNCIONE APENAS DESCOMENTAR O CODIGO ABAIXO (PLACEHOLDER)

        
        // const result = [
        //     {
        //         time: "11:00",
        //         qtd: 30
        //     },
        //     {
        //         time: "11:30",
        //         qtd: 50
        //     },
        //     {
        //         time: "12:00",
        //         qtd: 120
        //     },
        //     {
        //         time: "12:30",
        //         qtd: 150
        //     },
        //     {
        //         time: "13:00",
        //         qtd: 100
        //     },
        //     {
        //         time: "13:30",
        //         qtd: 80
        //     },
        //     {
        //         time: "14:00",
        //         qtd: 20
        //     }
        // ];
        return result;
    }, [allMenus, currentMenu, menuInfo?.checkouts]);

    return (
        <div className={styles.report}>
            <Header />
            <h1 className={styles.report__title}>Relatórios</h1>
            <div className={styles.report__filter}>
                <select value={currentMenu} onChange={e => setCurrentMenu(e.target.value)} placeholder="Selecione um cardápio">
                    {allMenus.map((menu, idx) => <option key={idx} value={idx}>{menu.nome}</option>)}
                </select>
            </div>
            {menuInfo ? (
                <div className={styles.report__content}>
                    <div className={styles.report__header}>
                        <img src={Meal} alt="Refeição" />
                        <div className={styles.report__headerContent}>
                            <h2>{allMenus[currentMenu].nome}</h2>
                            <p className={styles.report__headerRate}>
                                <AiFillStar />
                                {menuInfo.avaliacaoMedia}
                            </p>
                            <ResponsiveContainer minHeight={100} className={styles.report__rateChart}>
                                <BarChart
                                    layout="vertical"
                                    data={buildDataAvaliacao()}
                                    stackOffset={'expand'}
                                >
                                    <YAxis
                                        dataKey="nota"
                                        type="number"
                                        interval={0}
                                        ticks={[5, 4, 3, 2, 1]}
                                        reversed
                                        tickCount={3}
                                        axisLine={false}
                                        tickMargin={5}
                                        tickLine={false}
                                        tick={{ stroke: 'var(--mid-blue)', fontSize: '1rem' }}
                                        width={15}
                                    />
                                    <XAxis type="number" hide />
                                    <Bar dataKey="qtd" fill="var(--mid-blue)" barSize={10} radius={[4, 4, 4, 4]} stackId="a" />
                                    <Bar dataKey="remain" fill="var(--greyer)" barSize={10} radius={[0, 4, 4, 0]} stackId="a" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className={styles.report__statistics}>
                        <h2>Estatísticas</h2>
                        <ul className={styles.report__statisticsInfo}>
                            <li>Quantidade de comensais: <b>{menuInfo.comensais}</b></li>
                            <li>Taxa de avaliação: <b>{menuInfo.taxaAvaliacao}%</b></li>
                            <li>Percentual de Optantes: <b>{menuInfo.taxaOptantes}%</b></li>
                            <li>Taxa de Resposta (Comentários): <b>{menuInfo.taxaComentario}%</b></li>
                        </ul>
                    </div>
                    <div className={styles.report__times}>
                        <h2>Horários</h2>
                        <ResponsiveContainer minHeight={100} className={styles.report__timesChart}>
                            <BarChart data={buildDataHorarios()}>
                                <XAxis
                                    dataKey="time"
                                    interval={0}
                                    angle={270}
                                    tickLine={false}
                                    tick={{ stroke: 'var(--mid-blue)', strokeWidth: 0.7, fontSize: '1.1rem' }}
                                    tickMargin={13}
                                    padding={{ left: 15, right: 15 }}
                                />
                                <Bar dataKey="qtd" fill="var(--mid-blue)" barSize={10} radius={[4, 4, 0, 0]}>
                                    {
                                        menuInfo.checkouts.map((_, idx) => (
                                            <Cell key={`cell-${idx}`} fill={`var(--${idx % 2 === 0 ? 'mid-' : ''}blue`} width={17} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={styles.report__comments}>
                        <h2>Comentários</h2>
                        <div className={styles.report__commentCarousel}>
                            <BsFillArrowLeftCircleFill className={styles.report__commentPrev} onClick={() => setCurrentComment(currentComment - 1)} color={`var(--${currentComment ? "dark-blue" : "mid-grey"})`} />
                            <Carousel
                                dynamicHeight
                                emulateTouch
                                showIndicators={false}
                                showArrows={false}
                                showStatus={false}
                                showThumbs={false}
                                className={styles.report__commentText}
                                selectedItem={currentComment}
                                onChange={(idx) => setCurrentComment(idx)}
                            >
                                {menuInfo.avaliacoesComentarios.map(comentario => (
                                    <p key={comentario} >{comentario}</p>
                                ))}
                            </Carousel>
                            <BsFillArrowRightCircleFill className={styles.report__commentNext} onClick={() => setCurrentComment(currentComment + 1)} color={`var(--${currentComment < menuInfo.avaliacoesComentarios.length - 1 ? "dark-blue" : "mid-grey"})`} />
                        </div>
                    </div>
                </div>) :
                <p className={styles.report__empty}>Dados insuficientes para <br/>Gerar Relatório do <br/>Cardápio Selecionado</p>
            }
        </div>
    );
}

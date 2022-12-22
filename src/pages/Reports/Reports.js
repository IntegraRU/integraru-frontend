import styles from "./Reports.module.css";
import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import Meal from '../../assets/food.png';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts'
import { Carousel } from 'react-responsive-carousel';
import { format } from 'date-fns'
import { useUser } from '../../contexts/userContext';
import api from '../../services/api';


export default function Reports() {
    const [allMenus, setAllMenus] = useState([]);
    const [currentMenu, setCurrentMenu] = useState(0);
    const [currentComment, setCurrentComment] = useState(0);
    const [menuInfo, setMenuInfo] = useState({
        titulo: "Feijoada com Arroz",
        nota: 4.2,
        distribuicaoNota: [
            {
                nota: 1,
                qtd: 2,
                remain: 12
            },
            {
                nota: 2,
                qtd: 3,
                remain: 11
            },
            {
                nota: 3,
                qtd: 1,
                remain: 13
            },
            {
                nota: 4,
                qtd: 2,
                remain: 12
            },
            {
                nota: 5,
                qtd: 6,
                remain: 7
            }
        ],
        quantidade: 500,
        taxaAvaliacao: 0.4,
        optantes: 0.7,
        distribuicaoHorarios: [
            {
                time: "11:00",
                qtd: 30
            },
            {
                time: "11:30",
                qtd: 50
            },
            {
                time: "12:00",
                qtd: 120
            },
            {
                time: "12:30",
                qtd: 150
            },
            {
                time: "13:00",
                qtd: 100
            },
            {
                time: "13:30",
                qtd: 80
            },
            {
                time: "14:00",
                qtd: 20
            }
        ],
        comentarios: [
            "Arroz muito insosso",
            "Gostei, poderia ter mais purê",
            "O de ontem foi melhor"
        ]
    });
    const navigate = useNavigate();
    const { currentUser } = useUser();

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
                if(allMenus[currentMenu]){
                    const response = await api().get(`/relatorio/${allMenus[currentMenu].id}`);
                    // setMenuInfo(response.data);
                }
            } catch (e) {
                alert(e);
            }
        }
        fetchMenuInfo();
    }, [allMenus, currentMenu]);

    return (
        <div className={styles.report}>
            <Header />
            <h1 className={styles.report__title}>Relatórios</h1>
            <div className={styles.report__filter}>
                <select value={currentMenu} onChange={e => setCurrentMenu(e.target.value)} placeholder="Selecione um cardápio">
                    {allMenus.map((menu, idx) => <option key={idx} value={idx}>{menu.nome}</option>)}
                </select>
            </div>
            <div className={styles.report__content}>
                <div className={styles.report__header}>
                    <img src={Meal} alt="Refeição" />
                    <div className={styles.report__headerContent}>
                        <h2>{menuInfo.titulo}</h2>
                        <p className={styles.report__headerRate}>
                            <AiFillStar />
                            {menuInfo.nota}
                        </p>
                        <ResponsiveContainer minHeight={100} className={styles.report__rateChart}>
                            <BarChart
                                layout="vertical"
                                data={menuInfo.distribuicaoNota}
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
                        <li>Quantidade de comensais: <b>{menuInfo.quantidade}</b></li>
                        <li>Taxa de avaliação: <b>{menuInfo.taxaAvaliacao * 100}%</b></li>
                        <li>Percentual de Optantes: <b>{menuInfo.optantes * 100}%</b></li>
                    </ul>
                </div>
                <div className={styles.report__times}>
                    <h2>Horários</h2>
                    <ResponsiveContainer minHeight={100} className={styles.report__timesChart}>
                        <BarChart data={menuInfo.distribuicaoHorarios}>
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
                                    menuInfo.distribuicaoHorarios.map((_, idx) => (
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
                            {menuInfo.comentarios.map(comentario => (
                                <p key={comentario} >{comentario}</p>
                                ))}
                        </Carousel>
                        <BsFillArrowRightCircleFill className={styles.report__commentNext} onClick={() => setCurrentComment(currentComment + 1)} color={`var(--${currentComment < menuInfo.comentarios.length - 1 ? "dark-blue" : "mid-grey"})`} />
                    </div>
                </div>
            </div>
        </div>
    );
}

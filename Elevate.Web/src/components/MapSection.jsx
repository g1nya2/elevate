import { useState, useRef } from 'react';
import KoreaMap from './KoreaMap';
import MapTooltip from './MapTooltip';
import { offices, officeNames } from '../constants/offices';
import { normalizeUrl } from '../utils/url';
import feelingsMonster from '../assets/FeelingsMonster.png';

const MapSection = () => {
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const mapContainerRef = useRef(null);

    const handleMapPointEnter = (e, key) => {
        const name = officeNames[key] || key || "지역";
        const rect = mapContainerRef.current.getBoundingClientRect();
        
        setTooltip({
            visible: true,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top - 40,
            text: name
        });
        setHoveredRegion(key);
    };

    const handleMapPointMove = (e) => {
        if (!tooltip.visible) return;
        const rect = mapContainerRef.current.getBoundingClientRect();
        setTooltip(prev => ({
            ...prev,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top - 40,
        }));
    };

    const handleMapPointLeave = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
        setHoveredRegion(null);
    };

    const handleMapPointClick = (key) => {
        const name = officeNames[key] || key;
        const url = normalizeUrl(offices[key]);

        if (!url) return;
        if (window.confirm(`${name} M365 지원 페이지로 이동하여\n계정 문제를 해결하시겠습니까?`)) {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <section id="map-section" className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 pt-24 pb-12 gap-12">
            
            <div className="lg:w-1/2 z-10 hero-text">
                <div style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 1s ease-out' }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-ms-blue text-xs font-bold mb-6 tracking-wide uppercase shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    AI for ALL
                </div>

                <h1 style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 1s ease-out 0.15s' }} className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-slate-900 tracking-tight">
                    교실의 미래,<br/>
                    <span className="text-gradient">Microsoft AI</span>가<br/>
                    함께합니다.
                </h1>

                <p style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 1s ease-out 0.3s' }} className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed font-medium">
                    모두를 위한 AI 교육 환경,<br/>M365와 Copilot으로 바로 시작해 보세요!<br/>
                    <span className="text-slate-900 font-bold underline decoration-ms-blue/30 decoration-4 underline-offset-4">
                        먼저, 지도에서 교육청을 선택해주세요.
                    </span>
                </p>

                <div style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 1s ease-out 0.45s' }} className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 flex items-start gap-4 w-full max-w-lg transform transition-transform hover:scale-105">
                    <img src={feelingsMonster} alt="Student icon" className="w-16 h-16 object-contain shrink-0" />
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">학생 혹은 교원이신가요?</h3>
                        <p className="text-sm text-slate-500">
                            각 교육청 Microsoft 포털에서,
                            <br className="block sm:hidden" />
                            Microsoft AI를 바로 시작해보세요!
                        </p>
                    </div>
                </div>
            </div>

            <div 
                ref={mapContainerRef}
                className="lg:w-1/2 relative flex justify-center items-center h-[500px] lg:h-[750px] w-full map-container"
                style={{ opacity: 0, transform: 'scale(0.95)', transition: 'all 1.2s ease-out 0.3s' }}
            >
                <KoreaMap 
                    hoveredRegion={hoveredRegion}
                    onPointEnter={handleMapPointEnter}
                    onPointMove={handleMapPointMove}
                    onPointLeave={handleMapPointLeave}
                    onPointClick={handleMapPointClick}
                />

                <MapTooltip tooltip={tooltip} />
            </div>
        </section>
    );
};

export default MapSection;

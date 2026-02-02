import { useEffect } from 'react';

/**
 * 페이지 로드 시 히어로 섹션의 요소들을 순차적으로 나타나게 하는 초기 애니메이션 훅
 * .hero-text 내부 요소들과 .map-container에 애니메이션 적용
 */
export const useHeroAnimation = () => {
    useEffect(() => {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + index * 150);
        });

        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            setTimeout(() => {
                mapContainer.style.opacity = '1';
                mapContainer.style.transform = 'scale(1)';
            }, 300);
        }
    }, []);
};

import {useEffect} from 'react';
import {OverlayScrollbars} from 'overlayscrollbars';

const scrollbar = (root, hasScroll) => {
    useEffect(() => {
        let scrollBars;
        if (root.current && hasScroll) {
            scrollBars = OverlayScrollbars(root.current, {});
        }

        return () => {
            if (scrollBars) {
                scrollBars.destroy();
            }
        };
    }, [root, hasScroll]);
};
export {scrollbar};

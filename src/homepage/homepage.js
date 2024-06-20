import React, { Suspense } from 'react';
import CustomLoader from '../Components/CustomLoader/customLoader';

const Deals = React.lazy(() => import("./dealsOfTheDay"));
const Discover = React.lazy(() => import("./discover"));
const Inspiration = React.lazy(() => import("./inspiration"));
const CommentBox = React.lazy(() => import("./more").then(module => ({ default: module.CommentBox })));
const Order = React.lazy(() => import("./more").then(module => ({ default: module.Order })));
const Rewards = React.lazy(() => import("./more").then(module => ({ default: module.Rewards })));
const SubscribePart = React.lazy(() => import("./more").then(module => ({ default: module.SubscribePart })));
const Recent = React.lazy(() => import("./recent"));
const TodayPicks = React.lazy(() => import("./todayPicks"));
const Viewed = React.lazy(() => import("./viewed"));

export default function Homepage() {
    return (
        <Suspense fallback={<div><CustomLoader/></div>}>
            <Discover />
            <Deals />
            <CommentBox />
            <Recent />
            <Order />
            {/* <Viewed /> */}
            {/* <Inspiration /> */}
            <SubscribePart />
            <TodayPicks />
            <Rewards />
        </Suspense>
    );
}

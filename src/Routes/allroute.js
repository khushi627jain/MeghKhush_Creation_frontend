import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

// Lazy load route components
const Gift = React.lazy(() => import("../Gifts/gift"));
const Homepage = React.lazy(() => import("../homepage/homepage"));
const GiftPage = React.lazy(() => import("../Gifts/giftpage"));
const GiftDetails = React.lazy(() => import("../Gifts/giftdetailspage"));
const Cart = React.lazy(() => import("../Gifts/cart"));
const Wishlist = React.lazy(() => import("../Gifts/wishlist"));
const Sorry = React.lazy(() => import("../Gifts/sorry"));
const Search = React.lazy(() => import("../Gifts/searchedData"));
const Dashboard = React.lazy(() => import("../dashboard/dashboard"));
const EditAndDelete = React.lazy(() => import("../dashboard/edit&delete"));
const NamePlate = React.lazy(() => import("../nameplate/nameplate"));
const AllCategory = React.lazy(() => import("../Gifts/category"));

export default function AllRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/gift" element={<Gift />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/gift/all" element={<GiftPage />} />
        <Route path="/gift/single/:id" element={<GiftDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/sorry" element={<Sorry />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit" element={<EditAndDelete />} />
        <Route path="/nameplate" element={<NamePlate />} />
        <Route path="/gift/category/:type" element={<AllCategory />} />
      </Routes>
    </Suspense>
  );
}

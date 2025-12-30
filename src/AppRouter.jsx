import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InterviewFlow from './InterviewFlow';
import AnnualOfferPage from './pages/AnnualOfferPage';
import MonthlyOfferPage from './pages/MonthlyOfferPage';
import BridgeScreen from './pages/BridgeScreen';
import NameCollectionScreen from './components/NameCollectionScreen';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/name-collection" element={<NameCollectionScreen />} />
        <Route path="/" element={<InterviewFlow />} />
        <Route path="/bridge" element={<BridgeScreen />} />
        <Route path="/offer" element={<AnnualOfferPage />} />
        <Route path="/annual" element={<AnnualOfferPage />} />
        <Route path="/monthly" element={<MonthlyOfferPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}




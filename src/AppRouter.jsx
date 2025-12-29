import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InterviewFlow from './InterviewFlow';
import AnnualOfferPage from './pages/AnnualOfferPage';
import MonthlyOfferPage from './pages/MonthlyOfferPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InterviewFlow />} />
        <Route path="/offer" element={<AnnualOfferPage />} />
        <Route path="/annual" element={<AnnualOfferPage />} />
        <Route path="/monthly" element={<MonthlyOfferPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


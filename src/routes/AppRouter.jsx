import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';
import RouteTransitionLoader from '../components/common/RouteTransitionLoader';
import ScrollToTop from '../components/common/ScrollToTop';
import SmoothScroll from '../components/common/SmoothScroll';
import DemoNavigationPanel from '../components/demo/DemoNavigationPanel';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const NotFound = lazy(() => import('../pages/NotFound'));

const PublicMedicationSearch = lazy(() => import('../pages/public/PublicMedicationSearch'));
const PublicNearbyPharmacies = lazy(() => import('../pages/public/PublicNearbyPharmacies'));
const PublicPharmacyDetails = lazy(() => import('../pages/public/PublicPharmacyDetails'));
const About = lazy(() => import('../pages/public/About'));
const EmergencyAvailability = lazy(() => import('../pages/public/EmergencyAvailability'));
const HelpCenter = lazy(() => import('../pages/support/HelpCenter'));

const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const UserManagement = lazy(() => import('../pages/admin/UserManagement'));
const PharmacyApprovals = lazy(() => import('../pages/admin/PharmacyApprovals'));
const DistributorApprovals = lazy(() => import('../pages/admin/DistributorApprovals'));
const PlatformAnalytics = lazy(() => import('../pages/admin/PlatformAnalytics'));
const ActivityLogs = lazy(() => import('../pages/admin/ActivityLogs'));
const SystemSettings = lazy(() => import('../pages/admin/SystemSettings'));

const PharmacyDashboard = lazy(() => import('../pages/pharmacy/PharmacyDashboard'));
const InventoryManagement = lazy(() => import('../pages/pharmacy/InventoryManagement'));
const MedicationDetails = lazy(() => import('../pages/pharmacy/MedicationDetails'));
const StockAlerts = lazy(() => import('../pages/pharmacy/StockAlerts'));
const AdvancedInventory = lazy(() => import('../pages/pharmacy/AdvancedInventory'));
const ReservationManagement = lazy(() => import('../pages/pharmacy/ReservationManagement'));
const SalesAnalytics = lazy(() => import('../pages/pharmacy/SalesAnalytics'));
const OrdersManagement = lazy(() => import('../pages/pharmacy/OrdersManagement'));
const PharmacySettings = lazy(() => import('../pages/pharmacy/PharmacySettings'));
const DistributorDashboard = lazy(() => import('../pages/distributor/DistributorDashboard'));
const ShipmentManagement = lazy(() => import('../pages/distributor/ShipmentManagement'));
const DeliveryTracking = lazy(() => import('../pages/distributor/DeliveryTracking'));
const OrdersQueue = lazy(() => import('../pages/distributor/OrdersQueue'));
const RouteOptimization = lazy(() => import('../pages/distributor/RouteOptimization'));
const RevenueOverview = lazy(() => import('../pages/distributor/RevenueOverview'));
const DistributorAnalytics = lazy(() => import('../pages/distributor/DistributorAnalytics'));
const DistributorSettings = lazy(() => import('../pages/distributor/DistributorSettings'));
const UserDashboard = lazy(() => import('../pages/user/UserDashboard'));
const MedicationSearch = lazy(() => import('../pages/user/MedicationSearch'));
const NearbyPharmacies = lazy(() => import('../pages/user/NearbyPharmacies'));
const ReservationTracking = lazy(() => import('../pages/user/ReservationTracking'));
const MedicalCertificateUpload = lazy(() => import('../pages/user/MedicalCertificateUpload'));
const UserNotifications = lazy(() => import('../pages/user/UserNotifications'));
const UserProfile = lazy(() => import('../pages/user/UserProfile'));
const Favorites = lazy(() => import('../pages/user/Favorites'));
const UserSettings = lazy(() => import('../pages/user/UserSettings'));

const PharmacyProfile = lazy(() => import('../pages/pharmacy/PharmacyProfile'));
const PharmacyNotifications = lazy(() => import('../pages/pharmacy/PharmacyNotifications'));
const LoyalPatients = lazy(() => import('../pages/pharmacy/LoyalPatients'));

const DistributorProfile = lazy(() => import('../pages/distributor/DistributorProfile'));
const DistributorNotifications = lazy(() => import('../pages/distributor/DistributorNotifications'));
const DistributorReservations = lazy(() => import('../pages/distributor/DistributorReservations'));

const AdminProfile = lazy(() => import('../pages/admin/AdminProfile'));
const AdminNotifications = lazy(() => import('../pages/admin/AdminNotifications'));
const AdminReservations = lazy(() => import('../pages/admin/AdminReservations'));

const MessagingPage = lazy(() => import('../pages/messaging/MessagingPage'));

const NearbyPharmaciesMap = lazy(() => import('../pages/maps/NearbyPharmaciesMap'));
const DeliveryTrackingMap = lazy(() => import('../pages/maps/DeliveryTrackingMap'));
const PharmacyLocator = lazy(() => import('../pages/maps/PharmacyLocator'));
const EmergencyAvailabilityMap = lazy(() => import('../pages/maps/EmergencyAvailabilityMap'));

const NotificationsCenter = lazy(() => import('../pages/notifications/NotificationsCenter'));
const ActivityFeed = lazy(() => import('../pages/notifications/ActivityFeed'));
const AlertsDashboard = lazy(() => import('../pages/notifications/AlertsDashboard'));
const RealtimeUpdates = lazy(() => import('../pages/notifications/RealtimeUpdates'));

const DemoHome = lazy(() => import('../pages/demo/DemoHome'));
const PlatformOverview = lazy(() => import('../pages/demo/PlatformOverview'));
const SystemArchitecture = lazy(() => import('../pages/demo/SystemArchitecture'));
const TechStack = lazy(() => import('../pages/demo/TechStack'));
const UMLOverview = lazy(() => import('../pages/demo/UMLOverview'));
const ProjectStatistics = lazy(() => import('../pages/demo/ProjectStatistics'));
const DemoScript = lazy(() => import('../pages/demo/DemoScript'));
const PatientDemoFlow = lazy(() => import('../pages/demo/PatientDemoFlow'));
const PharmacyDemoFlow = lazy(() => import('../pages/demo/PharmacyDemoFlow'));
const DistributorDemoFlow = lazy(() => import('../pages/demo/DistributorDemoFlow'));
const AdminDemoFlow = lazy(() => import('../pages/demo/AdminDemoFlow'));

const PageSkeleton = () => (
  <div className="space-y-4 p-4 lg:p-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-7 w-44 bg-slate-200/60 rounded-lg" />
        <div className="h-4 w-28 bg-slate-200/40 rounded-lg" />
      </div>
      <div className="h-10 w-32 bg-slate-200/60 rounded-2xl" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/[0.06] p-5 space-y-3">
          <div className="h-4 w-24 bg-slate-200/60 dark:bg-white/[0.06] rounded-lg" />
          <div className="h-8 w-16 bg-slate-200/60 dark:bg-white/[0.06] rounded-lg" />
          <div className="h-3 w-32 bg-slate-200/40 dark:bg-white/[0.04] rounded-lg" />
        </div>
      ))}
    </div>
    <div className="h-64 bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/[0.06]" />
  </div>
);

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<PageSkeleton />}>
    {children}
  </Suspense>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouteTransitionLoader />
      <ScrollToTop />
      <SmoothScroll>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SuspenseWrapper><Home /></SuspenseWrapper>} />
          <Route path="/login" element={<SuspenseWrapper><Login /></SuspenseWrapper>} />
          <Route path="/register" element={<SuspenseWrapper><Register /></SuspenseWrapper>} />
          <Route path="/forgot-password" element={<SuspenseWrapper><ForgotPassword /></SuspenseWrapper>} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/search" element={<SuspenseWrapper><PublicMedicationSearch /></SuspenseWrapper>} />
          <Route path="/medications" element={<SuspenseWrapper><PublicMedicationSearch /></SuspenseWrapper>} />
          <Route path="/medications/:id" element={<SuspenseWrapper><PublicPharmacyDetails /></SuspenseWrapper>} />
          <Route path="/pharmacies" element={<SuspenseWrapper><PublicNearbyPharmacies /></SuspenseWrapper>} />
          <Route path="/pharmacies/:id" element={<SuspenseWrapper><PublicPharmacyDetails /></SuspenseWrapper>} />
          <Route path="/maps" element={<SuspenseWrapper><NearbyPharmaciesMap /></SuspenseWrapper>} />
          <Route path="/about" element={<SuspenseWrapper><About /></SuspenseWrapper>} />
          <Route path="/support" element={<SuspenseWrapper><HelpCenter /></SuspenseWrapper>} />
          <Route path="/emergency-availability" element={<SuspenseWrapper><EmergencyAvailability /></SuspenseWrapper>} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/admin/*"
            element={
              <RoleProtectedRoute allowedRoles="ADMIN">
                <Routes>
                  <Route path="" element={<SuspenseWrapper><AdminDashboard /></SuspenseWrapper>} />
                  <Route path="/users" element={<SuspenseWrapper><UserManagement /></SuspenseWrapper>} />
                  <Route path="/pharmacies" element={<SuspenseWrapper><PharmacyApprovals /></SuspenseWrapper>} />
                  <Route path="/distributors" element={<SuspenseWrapper><DistributorApprovals /></SuspenseWrapper>} />
                  <Route path="/analytics" element={<SuspenseWrapper><PlatformAnalytics /></SuspenseWrapper>} />
                  <Route path="/logs" element={<SuspenseWrapper><ActivityLogs /></SuspenseWrapper>} />
                  <Route path="/settings" element={<SuspenseWrapper><SystemSettings /></SuspenseWrapper>} />
                  <Route path="/profile" element={<SuspenseWrapper><AdminProfile /></SuspenseWrapper>} />
                  <Route path="/notifications" element={<SuspenseWrapper><AdminNotifications /></SuspenseWrapper>} />
                  <Route path="/reservations" element={<SuspenseWrapper><AdminReservations /></SuspenseWrapper>} />
                </Routes>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/pharmacy/*"
            element={
              <RoleProtectedRoute allowedRoles="PHARMACY">
                <Routes>
                  <Route path="" element={<SuspenseWrapper><PharmacyDashboard /></SuspenseWrapper>} />
                  <Route path="/inventory" element={<SuspenseWrapper><InventoryManagement /></SuspenseWrapper>} />
                  <Route path="/inventory/details" element={<SuspenseWrapper><MedicationDetails /></SuspenseWrapper>} />
                  <Route path="/inventory/advanced" element={<SuspenseWrapper><AdvancedInventory /></SuspenseWrapper>} />
                  <Route path="/alerts" element={<SuspenseWrapper><StockAlerts /></SuspenseWrapper>} />
                  <Route path="/reservations" element={<SuspenseWrapper><ReservationManagement /></SuspenseWrapper>} />
                  <Route path="/analytics" element={<SuspenseWrapper><SalesAnalytics /></SuspenseWrapper>} />
                  <Route path="/orders" element={<SuspenseWrapper><OrdersManagement /></SuspenseWrapper>} />
                  <Route path="/settings" element={<SuspenseWrapper><PharmacySettings /></SuspenseWrapper>} />
                  <Route path="/loyal-patients" element={<SuspenseWrapper><LoyalPatients /></SuspenseWrapper>} />
                  <Route path="/profile" element={<SuspenseWrapper><PharmacyProfile /></SuspenseWrapper>} />
                  <Route path="/notifications" element={<SuspenseWrapper><PharmacyNotifications /></SuspenseWrapper>} />
                </Routes>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/distributor/*"
            element={
              <RoleProtectedRoute allowedRoles="DISTRIBUTOR">
                <Routes>
                  <Route path="" element={<SuspenseWrapper><DistributorDashboard /></SuspenseWrapper>} />
                  <Route path="/shipments" element={<SuspenseWrapper><ShipmentManagement /></SuspenseWrapper>} />
                  <Route path="/tracking" element={<SuspenseWrapper><DeliveryTracking /></SuspenseWrapper>} />
                  <Route path="/orders" element={<SuspenseWrapper><OrdersQueue /></SuspenseWrapper>} />
                  <Route path="/routes" element={<SuspenseWrapper><RouteOptimization /></SuspenseWrapper>} />
                  <Route path="/revenue" element={<SuspenseWrapper><RevenueOverview /></SuspenseWrapper>} />
                  <Route path="/analytics" element={<SuspenseWrapper><DistributorAnalytics /></SuspenseWrapper>} />
                  <Route path="/settings" element={<SuspenseWrapper><DistributorSettings /></SuspenseWrapper>} />
                  <Route path="/profile" element={<SuspenseWrapper><DistributorProfile /></SuspenseWrapper>} />
                  <Route path="/notifications" element={<SuspenseWrapper><DistributorNotifications /></SuspenseWrapper>} />
                  <Route path="/reservations" element={<SuspenseWrapper><DistributorReservations /></SuspenseWrapper>} />
                </Routes>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <RoleProtectedRoute allowedRoles="USER">
                <Routes>
                  <Route path="" element={<SuspenseWrapper><UserDashboard /></SuspenseWrapper>} />
                  <Route path="/search" element={<SuspenseWrapper><MedicationSearch /></SuspenseWrapper>} />
                  <Route path="/pharmacies" element={<SuspenseWrapper><NearbyPharmacies /></SuspenseWrapper>} />
                  <Route path="/reservations" element={<SuspenseWrapper><ReservationTracking /></SuspenseWrapper>} />
                  <Route path="/certificates" element={<SuspenseWrapper><MedicalCertificateUpload /></SuspenseWrapper>} />
                  <Route path="/notifications" element={<SuspenseWrapper><UserNotifications /></SuspenseWrapper>} />
                  <Route path="/profile" element={<SuspenseWrapper><UserProfile /></SuspenseWrapper>} />
                  <Route path="/favorites" element={<SuspenseWrapper><Favorites /></SuspenseWrapper>} />
                  <Route path="/settings" element={<SuspenseWrapper><UserSettings /></SuspenseWrapper>} />
                </Routes>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <SuspenseWrapper><MessagingPage /></SuspenseWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/maps/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/nearby" element={<SuspenseWrapper><NearbyPharmaciesMap /></SuspenseWrapper>} />
                  <Route path="/tracking" element={<SuspenseWrapper><DeliveryTrackingMap /></SuspenseWrapper>} />
                  <Route path="/locator" element={<SuspenseWrapper><PharmacyLocator /></SuspenseWrapper>} />
                  <Route path="/emergency" element={<SuspenseWrapper><EmergencyAvailabilityMap /></SuspenseWrapper>} />
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<SuspenseWrapper><NotificationsCenter /></SuspenseWrapper>} />
                  <Route path="/activity" element={<SuspenseWrapper><ActivityFeed /></SuspenseWrapper>} />
                  <Route path="/alerts" element={<SuspenseWrapper><AlertsDashboard /></SuspenseWrapper>} />
                  <Route path="/realtime" element={<SuspenseWrapper><RealtimeUpdates /></SuspenseWrapper>} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/demo" element={<SuspenseWrapper><DemoHome /></SuspenseWrapper>} />
        <Route path="/demo/platform-overview" element={<SuspenseWrapper><PlatformOverview /></SuspenseWrapper>} />
        <Route path="/demo/architecture" element={<SuspenseWrapper><SystemArchitecture /></SuspenseWrapper>} />
        <Route path="/demo/tech-stack" element={<SuspenseWrapper><TechStack /></SuspenseWrapper>} />
        <Route path="/demo/uml" element={<SuspenseWrapper><UMLOverview /></SuspenseWrapper>} />
        <Route path="/demo/statistics" element={<SuspenseWrapper><ProjectStatistics /></SuspenseWrapper>} />
        <Route path="/demo/script" element={<SuspenseWrapper><DemoScript /></SuspenseWrapper>} />
        <Route path="/demo/patient-flow" element={<SuspenseWrapper><PatientDemoFlow /></SuspenseWrapper>} />
        <Route path="/demo/pharmacy-flow" element={<SuspenseWrapper><PharmacyDemoFlow /></SuspenseWrapper>} />
        <Route path="/demo/distributor-flow" element={<SuspenseWrapper><DistributorDemoFlow /></SuspenseWrapper>} />
        <Route path="/demo/admin-flow" element={<SuspenseWrapper><AdminDemoFlow /></SuspenseWrapper>} />

        <Route path="*" element={<SuspenseWrapper><NotFound /></SuspenseWrapper>} />
      </Routes>
      <DemoNavigationPanel />
      </SmoothScroll>
    </BrowserRouter>
  );
};

export default AppRouter;

import { UserPlus, LogIn, Search, MapPin, CalendarCheck, ListChecks } from 'lucide-react';
import DemoFlowLayout from '../../components/demo/DemoFlowLayout';

const steps = [
  { num: 1, title: 'Registration', desc: 'Create a patient account with name, email, and password. Optional medical certificate upload for prescription medications.', icon: UserPlus, color: '#14B8A6', path: '/register' },
  { num: 2, title: 'Login', desc: 'Secure sign-in with email and password. JWT token-based authentication with Sanctum for API access.', icon: LogIn, color: '#0F766E', path: '/login' },
  { num: 3, title: 'Medication Search', desc: 'Search for medications by name, category, or active ingredient. Filter by dosage, form, and price range.', icon: Search, color: '#2563EB', path: '/search' },
  { num: 4, title: 'Pharmacy Selection', desc: 'Browse nearby pharmacies with inventory availability. View pharmacy details, ratings, and distance on interactive map.', icon: MapPin, color: '#7C3AED', path: '/pharmacies' },
  { num: 5, title: 'Reservation', desc: 'Select medication quantity, choose pickup time, and confirm reservation. Receive instant confirmation with unique ID.', icon: CalendarCheck, color: '#F59E0B', path: '/user/reservations' },
  { num: 6, title: 'Reservation Tracking', desc: 'Track reservation status in real-time: Pending, Confirmed, In Preparation, Ready for Pickup, Completed.', icon: ListChecks, color: '#EF4444', path: '/user/reservations' },
];

const PatientDemoFlow = () => (
  <DemoFlowLayout
    accentColor="#14B8A6"
    title="Patient Demo Flow"
    subtitle="End-to-end patient journey — registration to reservation tracking"
    steps={steps}
    variant="timeline"
    buttonLabel="View Screen"
    footer={{
      text: 'Patient flow complete — from first visit to medication pickup in 6 simple steps',
    }}
  />
);

export default PatientDemoFlow;

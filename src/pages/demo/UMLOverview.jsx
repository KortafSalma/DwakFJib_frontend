import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Users, GitBranch, Layout,
  Box, Workflow, Share2, Maximize2, X,
  ExternalLink
} from 'lucide-react';
import { DemoBadge } from '../../components/demo/DemoBadge';
import { encodePlantUML } from '../../utils/plantuml';

const useCasePuml = `@startuml
!theme plain
skinparam backgroundColor #F8FAFC
skinparam actorBackground #14B8A6
skinparam actorBorderColor #0F766E
skinparam useCaseBackground #FFFFFF
skinparam useCaseBorderColor #14B8A6
skinparam arrowColor #64748B

left to right direction

actor Patient
actor Pharmacy
actor Distributor
actor Administrator

rectangle "DWAFIJBK Platform" {
  usecase "Register" as UC1
  usecase "Search Medications" as UC2
  usecase "Find Pharmacies" as UC3
  usecase "Make Reservation" as UC4
  usecase "Track Reservation" as UC5
  usecase "Manage Inventory" as UC6
  usecase "Process Orders" as UC7
  usecase "Manage Catalog" as UC8
  usecase "Track Deliveries" as UC9
  usecase "Manage Users" as UC10
  usecase "View Analytics" as UC11
  usecase "Configure System" as UC12
}

Patient --> UC1
Patient --> UC2
Patient --> UC3
Patient --> UC4
Patient --> UC5
Pharmacy --> UC6
Pharmacy --> UC7
Distributor --> UC8
Distributor --> UC9
Administrator --> UC10
Administrator --> UC11
Administrator --> UC12
@enduml`;

const classPuml = `@startuml
!theme plain
skinparam backgroundColor #F8FAFC
skinparam classBackground #FFFFFF
skinparam classBorderColor #14B8A6
skinparam classHeaderBackgroundColor #14B8A6
skinparam classHeaderFontColor #FFFFFF
skinparam arrowColor #64748B

class User {
  + id: int
  + name: string
  + email: string
  + role: string
  + is_active: bool
  + login()
  + updateProfile()
}

class Patient {
  + makeReservation()
  + searchMedications()
}

class Pharmacy {
  + is_verified: bool
  + manageInventory()
  + processReservation()
}

class Medication {
  + name: string
  + price: decimal
  + quantity: int
  + expiry: date
}

class Reservation {
  + status: string
  + quantity: int
  + pickup_time: datetime
  + confirm()
  + cancel()
}

class Distributor {
  + is_verified: bool
  + processOrder()
  + trackDelivery()
}

class Order {
  + status: string
  + total: decimal
  + place()
  + cancel()
}

class Delivery {
  + status: string
  + driver: string
  + eta: datetime
  + start()
  + complete()
}

class Admin {
  + manageUsers()
  + verifyPharmacies()
  + viewReports()
}

User <|-- Patient
User <|-- Pharmacy
User <|-- Distributor
User <|-- Admin
Pharmacy "1" -- "*" Medication : contains
Patient "1" -- "*" Reservation : makes
Pharmacy "1" -- "*" Reservation : receives
Pharmacy "1" -- "*" Order : places
Distributor "1" -- "*" Order : processes
Order "1" -- "1" Delivery : has
@enduml`;

const archPuml = `@startuml
!theme plain
skinparam backgroundColor #F8FAFC
skinparam rectangleBackground #FFFFFF
skinparam rectangleBorderColor #14B8A6
skinparam arrowColor #64748B

title Architecture

package "Client" {
  [React SPA]
  [Tailwind CSS]
  [Axios HTTP]
}

package "Server" {
  [Laravel API]
  [Sanctum Auth]
  [Controllers]
  [Services]
}

package "Data" {
  [MySQL DB]
  [File Storage]
}

[React SPA] --> [Laravel API] : REST API / JSON
[Laravel API] --> [Sanctum Auth] : Validate
[Laravel API] --> [Controllers]
[Controllers] --> [Services]
[Services] --> [MySQL DB] : Queries
[Services] --> [File Storage] : Files
@enduml`;

const workflowPuml = `@startuml
!theme plain
skinparam backgroundColor #F8FAFC
skinparam stateBackground #FFFFFF
skinparam stateBorderColor #14B8A6
skinparam stateHeaderBackgroundColor #14B8A6
skinparam stateHeaderFontColor #FFFFFF
skinparam arrowColor #64748B

title Patient Reservation Workflow

state "Browse\nMedications" as Browse
state "Select\nPharmacy" as SelectP
state "Make\nReservation" as Reserve
state "Prepare\nOrder" as Prepare
state "Ready for\nPickup" as Ready
state "Pick Up\nMedications" as Pickup
state "Cancelled" as Cancelled

[*] --> Browse
Browse --> SelectP
SelectP --> Reserve
Reserve --> Prepare : Confirm
Prepare --> Ready
Ready --> Pickup : Notify
Pickup --> [*]

Reserve --> Cancelled : Cancel
Prepare --> Cancelled : Reject
Ready --> Cancelled : Expired
Cancelled --> [*]
@enduml`;

const diagrams = [
  {
    title: 'Use Case Diagram',
    icon: Users,
    color: '#14B8A6',
    desc: 'Interactions between actors (Patients, Pharmacies, Distributors, Admins) and the system\'s primary use cases.',
    puml: useCasePuml,
    file: 'use-case-diagram.puml'
  },
  {
    title: 'Class Diagram',
    icon: Box,
    color: '#0F766E',
    desc: 'Structural relationships between core domain entities with their attributes and methods.',
    puml: classPuml,
    file: 'class-diagram.puml'
  },
  {
    title: 'Architecture Diagram',
    icon: Layout,
    color: '#2563EB',
    desc: 'Three-tier architecture: React frontend, Laravel backend, MySQL database.',
    puml: archPuml,
    file: 'architecture-diagram.puml'
  },
  {
    title: 'Workflow Diagram',
    icon: Workflow,
    color: '#7C3AED',
    desc: 'End-to-end patient reservation workflow with state transitions.',
    puml: workflowPuml,
    file: 'workflow-diagram.puml'
  },
];

const UMLOverview = () => {
  const [modal, setModal] = useState(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <DemoBadge />
          </div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-7 rounded-full" style={{ backgroundColor: '#14B8A6' }} />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
              UML & Project Overview
            </h1>
          </div>
          <p className="text-sm ml-4" style={{ color: '#64748B' }}>
            PlantUML diagrams — click to expand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {diagrams.map((diagram, i) => {
            const Icon = diagram.icon;
            const imgUrl = encodePlantUML(diagram.puml);
            return (
              <motion.div
                key={diagram.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="rounded-2xl border border-slate-200 overflow-hidden"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="p-4" style={{ backgroundColor: `${diagram.color}08` }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: diagram.color, color: '#FFFFFF' }}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>{diagram.title}</h3>
                      <p className="text-[11px]" style={{ color: diagram.color }}>{diagram.file}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{diagram.desc}</p>
                </div>

                <div
                  className="p-3 cursor-pointer group relative"
                  onClick={() => setModal({ ...diagram, imgUrl })}
                >
                  <div className="rounded-xl overflow-hidden border border-slate-100 bg-[#F8FAFC] p-2">
                    <img
                      src={imgUrl}
                      alt={diagram.title}
                      className="w-full h-auto max-h-64 object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.02]"
                      style={{ minHeight: '120px' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center h-32 text-xs" style={{ color: '#94A3B8' }}>
                      <div className="text-center">
                        <FileText className="w-6 h-6 mx-auto mb-1" />
                        <p>Rendering unavailable</p>
                        <p className="text-[10px] mt-1">Source: docs/diagrams/{diagram.file}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-white/90 backdrop-blur border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 className="w-4 h-4" style={{ color: '#64748B' }} />
                  </div>
                </div>

                <div className="px-4 pb-3 flex items-center gap-2">
                  <Share2 className="w-3 h-3" style={{ color: '#94A3B8' }} />
                  <span className="text-[10px]" style={{ color: '#94A3B8' }}>
                    Source: <code className="text-[10px] font-mono" style={{ color: '#64748B' }}>docs/diagrams/{diagram.file}</code>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-slate-200 p-5"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="w-4 h-4" style={{ color: '#14B8A6' }} />
            <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>Sequence Diagram (Reservation Flow)</h3>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-100 bg-[#F8FAFC] p-2">
            <img
              src={encodePlantUML(`@startuml
!theme plain
skinparam backgroundColor #F8FAFC
skinparam participantBackground #FFFFFF
skinparam participantBorderColor #14B8A6
skinparam arrowColor #64748B

actor Patient as P
participant Frontend as FE
participant API as API
participant Database as DB

P -> FE: Search medications
FE -> API: GET /api/medications
API -> DB: SELECT query
DB --> API: Results
API --> FE: JSON response
FE --> P: Display results

P -> FE: Make reservation
FE -> API: POST /api/reservations
API -> DB: INSERT reservation
DB --> API: Confirmation
API --> FE: Created
FE --> P: Show confirmation

P -> FE: Track status
FE -> API: GET /api/reservations/{id}
API -> DB: SELECT status
DB --> API: Current status
API --> FE: Status update
FE --> P: Display status
@enduml`)}
              alt="Reservation Sequence Diagram"
              className="w-full h-auto max-h-64 object-contain mx-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden items-center justify-center h-32 text-xs" style={{ color: '#94A3B8' }}>
              <FileText className="w-6 h-6 mx-auto mb-1" />
              <p>Source: docs/diagrams/sequence-diagram.puml</p>
            </div>
          </div>
        </motion.div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setModal(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <modal.icon className="w-4 h-4" style={{ color: modal.color }} />
                <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>{modal.title}</h3>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={modal.imgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" style={{ color: '#64748B' }} />
                </a>
                <button
                  onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" style={{ color: '#64748B' }} />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-60px)]">
              <img
                src={modal.imgUrl}
                alt={modal.title}
                className="w-full h-auto mx-auto"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UMLOverview;

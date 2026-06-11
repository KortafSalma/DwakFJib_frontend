import { motion } from 'framer-motion';
import {
  Globe, Server, Database, Palette,
  Code2, Box
} from 'lucide-react';
import { DemoBadge } from '../../components/demo/DemoBadge';

const stackCategories = [
  {
    title: 'Frontend',
    icon: Globe,
    color: '#14B8A6',
    bg: 'rgba(20,184,166,0.08)',
    technologies: [
      { name: 'React', desc: 'UI library for building the SPA interface' },
      { name: 'Vite', desc: 'Next-generation build tool and dev server' },
      { name: 'React Router v7', desc: 'Client-side routing and navigation' },
      { name: 'Tailwind CSS 3', desc: 'Utility-first CSS framework for styling' },
      { name: 'Framer Motion', desc: 'Animation library for smooth transitions' },
      { name: 'Axios', desc: 'HTTP client for API communication' },
      { name: 'React Hook Form', desc: 'Form validation and state management' },
      { name: 'Zod', desc: 'Schema declaration and validation' },
    ]
  },
  {
    title: 'Backend',
    icon: Server,
    color: '#0F766E',
    bg: 'rgba(15,118,110,0.08)',
    technologies: [
      { name: 'Laravel', desc: 'PHP framework for the RESTful API' },
      { name: 'Sanctum', desc: 'Token-based API authentication' },
      { name: 'Eloquent ORM', desc: 'Active record database interaction' },
      { name: 'Laravel Migrations', desc: 'Database version control' },
      { name: 'Laravel Seeders', desc: 'Test and demo data population' },
      { name: 'Form Requests', desc: 'Input validation and authorization' },
      { name: 'API Resources', desc: 'Data transformation and serialization' },
    ]
  },
  {
    title: 'Database & Infrastructure',
    icon: Database,
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.08)',
    technologies: [
      { name: 'MySQL 8.0', desc: 'Relational database management system' },
      { name: 'Docker', desc: 'Containerized development environment' },
      { name: 'Nginx', desc: 'Reverse proxy server' },
      { name: 'Laragon', desc: 'Local development environment' },
    ]
  },
  {
    title: 'Design & UI',
    icon: Palette,
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    technologies: [
      { name: 'Lucide React', desc: 'Icon library for consistent icons' },
      { name: 'Leaflet', desc: 'Open-source map visualization' },
      { name: 'React Hot Toast', desc: 'Toast notification system' },
      { name: 'Lenis', desc: 'Smooth scrolling library' },
    ]
  },
];

const TechStack = () => {
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
              Technology Stack
            </h1>
          </div>
          <p className="text-sm ml-4" style={{ color: '#64748B' }}>
            Modern technologies powering the DWAFIJBK platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stackCategories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="rounded-2xl border border-slate-200 overflow-hidden"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="p-4 flex items-center gap-3" style={{ backgroundColor: category.bg }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: category.color, color: '#FFFFFF' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>{category.title}</h3>
                    <p className="text-xs" style={{ color: category.color }}>
                      {category.technologies.length} technologies
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {category.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors"
                      style={{ backgroundColor: '#F8FAFC' }}
                    >
                      <Code2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: category.color }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold" style={{ color: '#0F172A' }}>{tech.name}</p>
                        <p className="text-[11px]" style={{ color: '#94A3B8' }}>{tech.desc}</p>
                      </div>
                    </div>
                  ))}
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
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E2E8F0'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Box className="w-4 h-4" style={{ color: '#14B8A6' }} />
            <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>Summary</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['React', 'Vite', 'Tailwind CSS', 'Laravel', 'Sanctum', 'MySQL', 'Axios', 'Framer Motion', 'Docker'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  backgroundColor: '#E6FCF9',
                  color: '#0F766E',
                  border: '1px solid rgba(15,118,110,0.15)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TechStack;

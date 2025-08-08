export interface Employee {
  id: number;
  name: string;
  skills: string[];
  experience_years: number;
  projects: string[];
  availability: 'available' | 'busy' | 'partially_available';
  department: string;
  role: string;
  location: string;
  email: string;
}

export const employees: Employee[] = [
  {
    id: 1,
    name: "Alice Johnson",
    skills: ["Python", "React", "AWS", "PostgreSQL", "Docker"],
    experience_years: 5,
    projects: ["E-commerce Platform", "Healthcare Dashboard", "Data Analytics Tool"],
    availability: "available",
    department: "Engineering",
    role: "Full Stack Developer",
    location: "San Francisco, CA",
    email: "alice.johnson@company.com"
  },
  {
    id: 2,
    name: "Bob Smith",
    skills: ["Java", "Spring Boot", "Kubernetes", "MongoDB", "React"],
    experience_years: 7,
    projects: ["Banking System", "Microservices Architecture", "API Gateway"],
    availability: "busy",
    department: "Engineering",
    role: "Senior Backend Developer",
    location: "New York, NY", 
    email: "bob.smith@company.com"
  },
  {
    id: 3,
    name: "Carol Davis",
    skills: ["React Native", "iOS", "Android", "Flutter", "Firebase"],
    experience_years: 4,
    projects: ["Mobile Banking App", "Healthcare Mobile Platform", "Fitness Tracker"],
    availability: "available",
    department: "Mobile Development",
    role: "Mobile Developer",
    location: "Austin, TX",
    email: "carol.davis@company.com"
  },
  {
    id: 4,
    name: "David Wilson",
    skills: ["DevOps", "AWS", "Azure", "Terraform", "Jenkins", "Docker", "Kubernetes"],
    experience_years: 6,
    projects: ["Cloud Migration", "CI/CD Pipeline", "Infrastructure Automation"],
    availability: "partially_available",
    department: "DevOps",
    role: "DevOps Engineer",
    location: "Seattle, WA",
    email: "david.wilson@company.com"
  },
  {
    id: 5,
    name: "Emily Brown",
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    experience_years: 3,
    projects: ["Design System", "Mobile App Redesign", "Website Overhaul"],
    availability: "available",
    department: "Design",
    role: "Senior UX Designer",
    location: "Los Angeles, CA",
    email: "emily.brown@company.com"
  },
  {
    id: 6,
    name: "Frank Miller",
    skills: ["Python", "Machine Learning", "TensorFlow", "PyTorch", "Data Science"],
    experience_years: 8,
    projects: ["Recommendation Engine", "Fraud Detection System", "Predictive Analytics"],
    availability: "busy",
    department: "Data Science",
    role: "Senior Data Scientist",
    location: "Boston, MA",
    email: "frank.miller@company.com"
  },
  {
    id: 7,
    name: "Grace Lee",
    skills: ["Node.js", "Express", "MongoDB", "GraphQL", "TypeScript"],
    experience_years: 4,
    projects: ["Real-time Chat System", "Content Management Platform", "API Development"],
    availability: "available",
    department: "Engineering",
    role: "Backend Developer",
    location: "Denver, CO",
    email: "grace.lee@company.com"
  },
  {
    id: 8,
    name: "Henry Garcia",
    skills: ["React", "Vue.js", "TypeScript", "Sass", "Webpack"],
    experience_years: 5,
    projects: ["Admin Dashboard", "Customer Portal", "Progressive Web App"],
    availability: "partially_available",
    department: "Engineering",
    role: "Frontend Developer",
    location: "Miami, FL",
    email: "henry.garcia@company.com"
  },
  {
    id: 9,
    name: "Isabella Rodriguez",
    skills: ["Cybersecurity", "Penetration Testing", "Network Security", "Risk Assessment"],
    experience_years: 6,
    projects: ["Security Audit", "Vulnerability Assessment", "Compliance Framework"],
    availability: "available",
    department: "Security",
    role: "Security Engineer",
    location: "Washington, DC",
    email: "isabella.rodriguez@company.com"
  },
  {
    id: 10,
    name: "Jack Thompson",
    skills: ["Product Management", "Agile", "Roadmapping", "User Stories", "Analytics"],
    experience_years: 7,
    projects: ["Product Roadmap 2024", "Feature Prioritization", "Market Research"],
    availability: "busy",
    department: "Product",
    role: "Senior Product Manager",
    location: "San Francisco, CA",
    email: "jack.thompson@company.com"
  },
  {
    id: 11,
    name: "Kate Anderson",
    skills: ["QA Testing", "Automation", "Selenium", "Jest", "Cypress"],
    experience_years: 4,
    projects: ["Test Automation Framework", "Quality Assurance Process", "Bug Tracking"],
    availability: "available",
    department: "QA",
    role: "QA Engineer",
    location: "Portland, OR",
    email: "kate.anderson@company.com"
  },
  {
    id: 12,
    name: "Leo Martinez",
    skills: ["Golang", "Microservices", "gRPC", "Redis", "Elasticsearch"],
    experience_years: 5,
    projects: ["Search Engine", "Distributed System", "Performance Optimization"],
    availability: "available",
    department: "Engineering",
    role: "Backend Developer",
    location: "Chicago, IL",
    email: "leo.martinez@company.com"
  },
  {
    id: 13,
    name: "Maya Patel",
    skills: ["PHP", "Laravel", "MySQL", "Vue.js", "Redis"],
    experience_years: 6,
    projects: ["E-commerce Platform", "CRM System", "Inventory Management"],
    availability: "partially_available",
    department: "Engineering",
    role: "Full Stack Developer",
    location: "Phoenix, AZ",
    email: "maya.patel@company.com"
  },
  {
    id: 14,
    name: "Nathan White",
    skills: ["Swift", "iOS Development", "Core Data", "UIKit", "SwiftUI"],
    experience_years: 5,
    projects: ["iOS Banking App", "Health & Fitness App", "Social Media Platform"],
    availability: "busy",
    department: "Mobile Development", 
    role: "iOS Developer",
    location: "San Jose, CA",
    email: "nathan.white@company.com"
  },
  {
    id: 15,
    name: "Olivia Clark",
    skills: ["Business Analysis", "Requirements Gathering", "Process Improvement", "Stakeholder Management"],
    experience_years: 8,
    projects: ["Digital Transformation", "Process Automation", "System Requirements"],
    availability: "available",
    department: "Business Analysis",
    role: "Senior Business Analyst",
    location: "Atlanta, GA",
    email: "olivia.clark@company.com"
  },
  {
    id: 16,
    name: "Paul Young",
    skills: ["C#", ".NET Core", "Azure", "SQL Server", "Entity Framework"],
    experience_years: 9,
    projects: ["Enterprise Software", "Cloud Migration", "Legacy System Modernization"],
    availability: "available",
    department: "Engineering",
    role: "Senior .NET Developer",
    location: "Dallas, TX",
    email: "paul.young@company.com"
  }
];
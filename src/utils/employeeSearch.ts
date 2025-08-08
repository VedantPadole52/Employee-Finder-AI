import { Employee, employees } from '@/data/employees';

export interface SearchResult {
  employee: Employee;
  relevanceScore: number;
  matchedCriteria: string[];
}

export class EmployeeSearchEngine {
  private static instance: EmployeeSearchEngine;
  private employees: Employee[];

  constructor(employeeData: Employee[] = employees) {
    this.employees = employeeData;
  }

  static getInstance(): EmployeeSearchEngine {
    if (!EmployeeSearchEngine.instance) {
      EmployeeSearchEngine.instance = new EmployeeSearchEngine();
    }
    return EmployeeSearchEngine.instance;
  }

  searchEmployees(query: string): SearchResult[] {
    const normalizedQuery = query.toLowerCase();
    const searchTerms = this.extractSearchTerms(normalizedQuery);
    
    const results: SearchResult[] = [];

    for (const employee of this.employees) {
      const result = this.scoreEmployee(employee, searchTerms, normalizedQuery);
      if (result.relevanceScore > 0) {
        results.push(result);
      }
    }

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  private extractSearchTerms(query: string): {
    skills: string[];
    experience: number | null;
    projects: string[];
    availability: string | null;
    department: string | null;
    location: string | null;
  } {
    // Extract skills (common programming languages and technologies)
    const skillKeywords = [
      'python', 'java', 'javascript', 'react', 'angular', 'vue', 'node', 'express',
      'spring', 'django', 'flask', 'aws', 'azure', 'docker', 'kubernetes', 'mongodb',
      'postgresql', 'mysql', 'redis', 'elasticsearch', 'tensorflow', 'pytorch',
      'machine learning', 'data science', 'devops', 'ci/cd', 'terraform', 'jenkins',
      'ios', 'android', 'swift', 'kotlin', 'react native', 'flutter', 'figma',
      'ui/ux', 'design', 'testing', 'qa', 'selenium', 'cypress', 'golang', 'go',
      'php', 'laravel', 'c#', '.net', 'core', 'entity framework', 'graphql',
      'typescript', 'sass', 'webpack', 'microservices', 'grpc', 'cybersecurity',
      'penetration testing', 'network security'
    ];

    const skills = skillKeywords.filter(skill => 
      query.includes(skill) || query.includes(skill.replace(/\s+/g, ''))
    );

    // Extract experience years
    const experienceMatch = query.match(/(\d+)\+?\s*(?:years?|yrs?)/i);
    const experience = experienceMatch ? parseInt(experienceMatch[1]) : null;

    // Extract project-related keywords
    const projectKeywords = [
      'healthcare', 'banking', 'e-commerce', 'ecommerce', 'fintech', 'mobile',
      'web', 'api', 'dashboard', 'platform', 'system', 'application', 'app'
    ];
    const projects = projectKeywords.filter(keyword => query.includes(keyword));

    // Extract availability
    let availability: string | null = null;
    if (query.includes('available') && !query.includes('partially')) {
      availability = 'available';
    } else if (query.includes('partially available')) {
      availability = 'partially_available';
    } else if (query.includes('busy')) {
      availability = 'busy';
    }

    // Extract department
    const departmentKeywords = {
      'engineering': ['engineering', 'developer', 'development'],
      'design': ['design', 'designer', 'ux', 'ui'],
      'product': ['product', 'pm', 'product manager'],
      'data science': ['data science', 'data scientist', 'machine learning', 'ml'],
      'devops': ['devops', 'infrastructure'],
      'qa': ['qa', 'quality assurance', 'testing', 'tester'],
      'security': ['security', 'cybersecurity'],
      'mobile development': ['mobile', 'ios', 'android'],
      'business analysis': ['business analyst', 'ba', 'business analysis']
    };

    let department: string | null = null;
    for (const [dept, keywords] of Object.entries(departmentKeywords)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        department = dept;
        break;
      }
    }

    // Extract location (basic city/state detection)
    const locationKeywords = [
      'san francisco', 'new york', 'austin', 'seattle', 'los angeles',
      'boston', 'denver', 'miami', 'washington', 'portland', 'chicago',
      'phoenix', 'san jose', 'atlanta', 'dallas', 'remote'
    ];
    const location = locationKeywords.find(loc => query.includes(loc)) || null;

    return { skills, experience, projects, availability, department, location };
  }

  private scoreEmployee(employee: Employee, searchTerms: any, query: string): SearchResult {
    let score = 0;
    const matchedCriteria: string[] = [];

    // Skill matching (highest weight)
    const employeeSkills = employee.skills.map(s => s.toLowerCase());
    const skillMatches = searchTerms.skills.filter(skill => 
      employeeSkills.some(empSkill => 
        empSkill.includes(skill) || skill.includes(empSkill)
      )
    );
    
    if (skillMatches.length > 0) {
      score += skillMatches.length * 30;
      matchedCriteria.push(`Skills: ${skillMatches.join(', ')}`);
    }

    // Experience matching
    if (searchTerms.experience !== null) {
      if (employee.experience_years >= searchTerms.experience) {
        score += 20;
        matchedCriteria.push(`${employee.experience_years} years experience`);
      } else {
        score -= 10; // Penalty for not meeting experience requirement
      }
    }

    // Project domain matching
    const employeeProjects = employee.projects.map(p => p.toLowerCase()).join(' ');
    const projectMatches = searchTerms.projects.filter(proj => 
      employeeProjects.includes(proj)
    );
    
    if (projectMatches.length > 0) {
      score += projectMatches.length * 15;
      matchedCriteria.push(`Relevant projects: ${projectMatches.join(', ')}`);
    }

    // Availability matching
    if (searchTerms.availability && employee.availability === searchTerms.availability) {
      score += 25;
      matchedCriteria.push(`Availability: ${employee.availability}`);
    }

    // Department matching
    if (searchTerms.department && employee.department.toLowerCase().includes(searchTerms.department)) {
      score += 15;
      matchedCriteria.push(`Department: ${employee.department}`);
    }

    // Location matching
    if (searchTerms.location && employee.location.toLowerCase().includes(searchTerms.location)) {
      score += 10;
      matchedCriteria.push(`Location: ${employee.location}`);
    }

    // Name matching (exact or partial)
    if (employee.name.toLowerCase().includes(query)) {
      score += 40;
      matchedCriteria.push(`Name match`);
    }

    // Role/title matching
    if (employee.role.toLowerCase().includes(query) || query.includes(employee.role.toLowerCase())) {
      score += 20;
      matchedCriteria.push(`Role: ${employee.role}`);
    }

    return {
      employee,
      relevanceScore: score,
      matchedCriteria
    };
  }

  generateResponse(results: SearchResult[], originalQuery: string): string {
    if (results.length === 0) {
      return "I couldn't find any employees matching your criteria. Try adjusting your search terms or requirements.";
    }

    const topResults = results.slice(0, 5);
    let response = `I found ${results.length} employee(s) matching your query "${originalQuery}".\n\n`;
    
    if (results.length === 1) {
      response += "Here's the best match:";
    } else {
      response += "Here are the top matches:";
    }

    return response;
  }
}
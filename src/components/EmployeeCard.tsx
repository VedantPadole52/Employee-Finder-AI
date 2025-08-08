import { Employee } from '@/data/employees';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Mail, Briefcase, Clock, User } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  matchedCriteria?: string[];
  relevanceScore?: number;
}

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case 'available':
      return 'bg-success text-success-foreground';
    case 'partially_available':
      return 'bg-warning text-warning-foreground';
    case 'busy':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getAvailabilityText = (availability: string) => {
  switch (availability) {
    case 'available':
      return 'Available';
    case 'partially_available':
      return 'Partially Available';
    case 'busy':
      return 'Busy';
    default:
      return 'Unknown';
  }
};

export function EmployeeCard({ employee, matchedCriteria, relevanceScore }: EmployeeCardProps) {
  const initials = employee.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="hover:shadow-medium transition-all duration-300 bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {employee.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Briefcase className="w-4 h-4" />
                {employee.role}
              </div>
            </div>
          </div>
          <Badge className={getAvailabilityColor(employee.availability)}>
            {getAvailabilityText(employee.availability)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Department and Experience */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            {employee.department}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            {employee.experience_years} years exp.
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {employee.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Recent Projects</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {employee.projects.slice(0, 3).map((project, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                {project}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {employee.location}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {employee.email}
            </div>
          </div>
        </div>

        {/* Matched Criteria (when from search) */}
        {matchedCriteria && matchedCriteria.length > 0 && (
          <div className="pt-2 border-t border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-2">Match Criteria</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {matchedCriteria.map((criteria, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                  {criteria}
                </li>
              ))}
            </ul>
            {relevanceScore && (
              <div className="text-xs text-muted-foreground mt-2">
                Relevance Score: {relevanceScore}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
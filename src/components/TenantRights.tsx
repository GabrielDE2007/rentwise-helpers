
import React, { useState } from 'react';
import { Shield, BookOpen, Scale, AlertTriangle, MessageSquare, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import useTransitionEffect from '@/hooks/useTransitionEffect';

// FAQ data
const faqCategories = [
  {
    id: 'eviction',
    title: 'Eviction Protection',
    icon: <Shield className="text-rights-primary" />,
    questions: [
      {
        id: 'eviction-1',
        question: 'Can my landlord evict me without notice?',
        answer: 'No, in Newark, landlords must provide written notice before filing for eviction. The notice period varies based on the reason for eviction (typically 30 days for most non-payment issues). For non-payment of rent, the landlord can file for eviction without prior notice, but must serve you with court papers.'
      },
      {
        id: 'eviction-2',
        question: 'What are valid reasons for eviction in Newark?',
        answer: 'Valid reasons include: non-payment of rent, lease violations, disorderly conduct that disturbs other tenants, significant damage to the property, or if the owner wants to personally occupy the unit. In properties with rent control, reasons are more limited.'
      },
      {
        id: 'eviction-3',
        question: 'How long do I have to respond to an eviction notice?',
        answer: 'Once you receive a court summons, you typically have 10 calendar days to file an answer with the court. It\'s crucial to respond within this timeframe to avoid a default judgment against you.'
      },
    ]
  },
  {
    id: 'repairs',
    title: 'Repairs & Maintenance',
    icon: <AlertTriangle className="text-report-primary" />,
    questions: [
      {
        id: 'repairs-1',
        question: 'What repairs is my landlord legally required to make?',
        answer: 'Landlords must maintain habitable living conditions including: functional plumbing, heating, electricity, structural integrity, addressing pest infestations, and maintaining common areas. They must also comply with local building and housing codes.'
      },
      {
        id: 'repairs-2',
        question: 'What can I do if my landlord won\'t make repairs?',
        answer: 'First, send a written request for repairs. If no action is taken, you can: file a complaint with Newark\'s Code Enforcement, request a housing inspection, withhold rent (must be done properly), repair and deduct costs, or file a tenant rights lawsuit. Always document all communication and conditions.'
      },
      {
        id: 'repairs-3',
        question: 'Can I withhold rent for repairs?',
        answer: 'Yes, but with caution. New Jersey allows "rent withholding" when habitability is severely compromised. You must properly notify the landlord, give reasonable time for repairs, and place rent in an escrow account. Improper withholding can lead to eviction, so consult with a tenant rights attorney first.'
      }
    ]
  },
  {
    id: 'rentincrease',
    title: 'Rent Control & Increases',
    icon: <Scale className="text-rights-primary" />,
    questions: [
      {
        id: 'rent-1',
        question: 'Does Newark have rent control?',
        answer: 'Yes, Newark has rent control ordinances that limit how much landlords can increase rent each year for qualifying properties. Generally, the annual increase is tied to the Consumer Price Index (CPI), typically between 2-4%.'
      },
      {
        id: 'rent-2',
        question: 'Which properties are covered by rent control?',
        answer: 'Generally, buildings with more than 6 units are covered. Exceptions include: newer construction (post-1980s), owner-occupied buildings with 4 or fewer units, and publicly subsidized housing where rents are set by government programs.'
      },
      {
        id: 'rent-3',
        question: 'How much notice must a landlord give for a rent increase?',
        answer: 'For month-to-month tenancies, landlords must provide at least 30 days written notice before a rent increase. For yearly leases, notice must be given before renewal. If the increase exceeds rent control limits, tenants can contest it through Newark\'s Rent Control Board.'
      }
    ]
  },
  {
    id: 'deposits',
    title: 'Security Deposits',
    icon: <BookOpen className="text-muted-foreground" />,
    questions: [
      {
        id: 'deposit-1',
        question: 'How much can a landlord charge for security deposit?',
        answer: 'In New Jersey, security deposits are limited to 1.5 times the monthly rent. For example, if rent is $1,000 per month, the maximum security deposit would be $1,500.'
      },
      {
        id: 'deposit-2',
        question: 'When must my security deposit be returned?',
        answer: 'Landlords must return your security deposit within 30 days after you move out. They must provide an itemized list of any deductions. If they fail to return the deposit or provide an explanation within 30 days, you may be entitled to double the amount withheld.'
      },
      {
        id: 'deposit-3',
        question: 'What can be deducted from my security deposit?',
        answer: 'Landlords can deduct for: unpaid rent, damage beyond normal wear and tear, and charges specified in the lease. They cannot deduct for routine cleaning or normal wear and tear. Landlords must provide receipts for repairs that cost more than cleaning.'
      }
    ]
  }
];

const TenantRights: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const isVisible = useTransitionEffect();

  // Toggle FAQ question
  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Filter questions based on search term
  const filteredQuestions = searchTerm 
    ? faqCategories.flatMap(category => 
        category.questions.filter(q => 
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(q => ({ ...q, categoryId: category.id }))
      )
    : [];

  return (
    <div 
      className={cn(
        "transition-all duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="bg-rights-accent py-10 border-b border-border">
        <div className="main-container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-block category-pill bg-rights-primary/10 text-rights-primary">
              Know Your Rights
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Tenant Rights & Legal Information
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understand your rights as a tenant in Newark. Browse common questions or search for specific topics.
            </p>
            
            <div className="mt-6 relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search for a specific question or topic..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-rights-primary/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="main-container py-10">
        {/* Search Results */}
        {searchTerm && (
          <div className="mb-10 animate-fade-in">
            <h2 className="font-display text-2xl font-bold mb-6">
              Search Results
            </h2>
            
            {filteredQuestions.length === 0 ? (
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <p className="text-muted-foreground">
                  No results found for "{searchTerm}". Try a different search term.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <div 
                    key={question.id}
                    className="bg-white border border-border rounded-lg shadow-elevation-1 overflow-hidden"
                  >
                    <div 
                      className="flex justify-between items-start p-4 cursor-pointer"
                      onClick={() => toggleQuestion(question.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="pt-1">
                          {expandedQuestions[question.id] ? 
                            <ChevronDown className="h-4 w-4 text-rights-primary" /> : 
                            <ChevronRight className="h-4 w-4 text-rights-primary" />
                          }
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{question.question}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Category: {faqCategories.find(c => c.id === question.categoryId)?.title}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {expandedQuestions[question.id] && (
                      <div className="px-4 pb-4 pt-1 border-t border-border animate-accordion-down">
                        <div className="pl-7">
                          <p className="text-muted-foreground">{question.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FAQ Categories */}
        {!searchTerm && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="font-medium text-lg mb-4">FAQ Categories</h3>
              <nav className="space-y-1">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                      activeCategory === category.id
                        ? "bg-rights-accent text-rights-primary"
                        : "hover:bg-accent"
                    )}
                  >
                    <span className="flex-shrink-0">{category.icon}</span>
                    <span>{category.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 bg-rights-accent rounded-lg p-5 shadow-elevation-1">
                <h3 className="font-medium flex items-center space-x-2 mb-3">
                  <MessageSquare size={18} className="text-rights-primary" />
                  <span>Need Legal Help?</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you need personalized legal assistance for a housing issue, connect with local legal aid organizations.
                </p>
                <button className="w-full bg-rights-primary hover:bg-rights-dark text-white rounded-lg py-2 transition-colors">
                  Find Legal Aid
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white border border-border rounded-lg shadow-elevation-1 overflow-hidden">
                {faqCategories.find(c => c.id === activeCategory)?.questions.map((question) => (
                  <div key={question.id}>
                    <div 
                      className="flex justify-between items-start p-4 cursor-pointer hover:bg-rights-accent/30 transition-colors"
                      onClick={() => toggleQuestion(question.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="pt-1">
                          {expandedQuestions[question.id] ? 
                            <ChevronDown className="h-4 w-4 text-rights-primary" /> : 
                            <ChevronRight className="h-4 w-4 text-rights-primary" />
                          }
                        </div>
                        <h3 className="font-medium text-foreground">{question.question}</h3>
                      </div>
                    </div>
                    
                    {expandedQuestions[question.id] && (
                      <div className="px-4 pb-4 pt-1 border-t border-border animate-accordion-down">
                        <div className="pl-7">
                          <p className="text-muted-foreground">{question.answer}</p>
                        </div>
                      </div>
                    )}
                    
                    {question.id !== faqCategories.find(c => c.id === activeCategory)?.questions.slice(-1)[0].id && (
                      <div className="border-b border-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantRights;

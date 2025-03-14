
import React, { useState } from 'react';
import { Camera, Upload, X, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import useTransitionEffect from '@/hooks/useTransitionEffect';
import { useToast } from '@/hooks/use-toast';

// Issue types
const issueTypes = [
  { id: 'plumbing', label: 'Plumbing Issues', icon: <AlertTriangle size={18} /> },
  { id: 'heating', label: 'Heating & Cooling', icon: <AlertTriangle size={18} /> },
  { id: 'electrical', label: 'Electrical Problems', icon: <AlertTriangle size={18} /> },
  { id: 'structural', label: 'Structural Damage', icon: <AlertTriangle size={18} /> },
  { id: 'pests', label: 'Pest Infestation', icon: <AlertTriangle size={18} /> },
  { id: 'mold', label: 'Mold & Dampness', icon: <AlertTriangle size={18} /> },
  { id: 'security', label: 'Security Concerns', icon: <AlertTriangle size={18} /> },
  { id: 'common', label: 'Common Areas', icon: <AlertTriangle size={18} /> },
  { id: 'other', label: 'Other Issues', icon: <AlertTriangle size={18} /> }
];

// Severity levels
const severityLevels = [
  { id: 'emergency', label: 'Emergency - Immediate Danger', color: 'bg-report-primary text-white' },
  { id: 'urgent', label: 'Urgent - Affects Basic Living', color: 'bg-report-secondary text-white' },
  { id: 'moderate', label: 'Moderate - Significant Problem', color: 'bg-amber-500 text-white' },
  { id: 'minor', label: 'Minor - Not Urgent', color: 'bg-muted text-muted-foreground' }
];

const ReportIssue: React.FC = () => {
  const [issueType, setIssueType] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [contactLandlord, setContactLandlord] = useState(false);
  const [landlordContact, setLandlordContact] = useState('');
  const [contactDate, setContactDate] = useState('');
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  
  const isVisible = useTransitionEffect();
  const { toast } = useToast();

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Limit to 5 photos
      if (photos.length + newFiles.length > 5) {
        toast({
          title: "Too many photos",
          description: "You can upload a maximum of 5 photos",
          variant: "destructive"
        });
        return;
      }
      
      const newPhotos = newFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setPhotos([...photos, ...newPhotos]);
    }
  };

  // Remove a photo
  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // Submit form handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation
    if (!issueType || !severity || !description || !agreed) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!anonymous && (!name || !email || !address)) {
      toast({
        title: "Missing contact information",
        description: "Please provide your contact details or select the anonymous reporting option",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would submit to a backend API
    toast({
      title: "Report submitted successfully",
      description: "Your housing issue has been reported. Reference #REF-" + Math.floor(100000 + Math.random() * 900000),
      variant: "default"
    });

    // Reset form
    setIssueType('');
    setSeverity('');
    setDescription('');
    setContactLandlord(false);
    setLandlordContact('');
    setContactDate('');
    setPhotos([]);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setAnonymous(false);
    setStep(1);
    setAgreed(false);
  };

  // Next step handler
  const goToNextStep = () => {
    if (step === 1) {
      if (!issueType || !severity || !description) {
        toast({
          title: "Missing information",
          description: "Please select an issue type, severity, and provide a description",
          variant: "destructive"
        });
        return;
      }
    }
    
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Go back handler
  const goBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className={cn(
        "transition-all duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="bg-report-accent py-10 border-b border-border">
        <div className="main-container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-block category-pill bg-report-primary/10 text-report-primary">
              Report Issues
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Report Unsafe Living Conditions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use this form to report issues with your housing that your landlord has failed to address.
              You can report anonymously if you're concerned about retaliation.
            </p>
          </div>
        </div>
      </div>

      <div className="main-container py-10">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div
                    className={cn(
                      "w-10 h-10 mx-auto flex items-center justify-center rounded-full border-2 transition-colors",
                      step === i
                        ? "border-report-primary bg-report-primary text-white"
                        : step > i
                        ? "border-report-primary bg-white text-report-primary"
                        : "border-muted bg-muted/30 text-muted-foreground"
                    )}
                  >
                    {step > i ? <CheckCircle2 size={18} /> : i}
                  </div>
                  <span
                    className={cn(
                      "text-sm mt-2 block",
                      step >= i ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {i === 1 ? "Issue Details" : i === 2 ? "Evidence & Photos" : "Review & Submit"}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-muted/50"></div>
              <div
                className="absolute top-0 left-0 h-1 bg-report-primary transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Issue Details */}
            {step === 1 && (
              <div className="animate-fade-in">
                <div className="bg-white rounded-xl border border-border shadow-elevation-1 p-6 space-y-6">
                  <h2 className="text-xl font-medium border-l-4 border-report-primary pl-3">
                    Tell us about the issue
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Type of Issue <span className="text-report-primary">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {issueTypes.map((type) => (
                        <button
                          type="button"
                          key={type.id}
                          onClick={() => setIssueType(type.id)}
                          className={cn(
                            "flex items-center space-x-2 p-3 rounded-lg border transition-all",
                            issueType === type.id
                              ? "border-report-primary bg-report-accent"
                              : "border-border hover:border-report-light"
                          )}
                        >
                          <span className={cn(
                            issueType === type.id ? "text-report-primary" : "text-muted-foreground"
                          )}>
                            {type.icon}
                          </span>
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Severity <span className="text-report-primary">*</span>
                    </label>
                    <div className="space-y-2">
                      {severityLevels.map((level) => (
                        <button
                          type="button"
                          key={level.id}
                          onClick={() => setSeverity(level.id)}
                          className={cn(
                            "w-full flex items-center space-x-3 p-3 rounded-lg border transition-all",
                            severity === level.id
                              ? "border-report-primary"
                              : "border-border hover:border-report-light"
                          )}
                        >
                          <div className={cn(
                            "w-3 h-3 rounded-full", 
                            level.color
                          )} />
                          <span>{level.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="description">
                      Describe the issue <span className="text-report-primary">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please provide details about the problem..."
                      className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-report-primary/50 min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="contactLandlord"
                        checked={contactLandlord}
                        onChange={(e) => setContactLandlord(e.target.checked)}
                        className="h-4 w-4 text-report-primary border-border rounded"
                      />
                      <label htmlFor="contactLandlord" className="text-sm">
                        I have already contacted my landlord about this issue
                      </label>
                    </div>
                    
                    {contactLandlord && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="landlordContact">
                            How did you contact them?
                          </label>
                          <select
                            id="landlordContact"
                            value={landlordContact}
                            onChange={(e) => setLandlordContact(e.target.value)}
                            className="w-full p-2 border border-border rounded-lg"
                          >
                            <option value="">Select an option</option>
                            <option value="phone">Phone call</option>
                            <option value="email">Email</option>
                            <option value="text">Text message</option>
                            <option value="letter">Written letter</option>
                            <option value="inperson">In person</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="contactDate">
                            When did you contact them?
                          </label>
                          <input
                            type="date"
                            id="contactDate"
                            value={contactDate}
                            onChange={(e) => setContactDate(e.target.value)}
                            className="w-full p-2 border border-border rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Evidence & Photos */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="bg-white rounded-xl border border-border shadow-elevation-1 p-6 space-y-6">
                  <h2 className="text-xl font-medium border-l-4 border-report-primary pl-3">
                    Add photos and your contact information
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Upload Photos (Maximum 5)
                    </label>
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-report-light transition-colors"
                      onClick={() => document.getElementById('photoUpload')?.click()}
                    >
                      <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Click to upload photos or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or JPEG (max 5MB each)
                      </p>
                      <input
                        type="file"
                        id="photoUpload"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </div>
                    
                    {photos.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={photo.preview}
                              alt={`Evidence ${index + 1}`}
                              className="h-20 w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-border"
                            >
                              <X size={14} className="text-report-primary" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-border pt-6">
                    <div className="flex items-start space-x-2 mb-4">
                      <div className="flex-shrink-0 mt-1">
                        <Info size={16} className="text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your contact information will only be used to follow up on your report
                        and will not be shared with your landlord without your permission.
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                        className="h-4 w-4 text-report-primary border-border rounded"
                      />
                      <label htmlFor="anonymous" className="text-sm">
                        I want to report anonymously
                      </label>
                    </div>
                    
                    {!anonymous && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="name">
                              Full Name <span className="text-report-primary">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full p-2 border border-border rounded-lg"
                              required={!anonymous}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">
                              Email <span className="text-report-primary">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full p-2 border border-border rounded-lg"
                              required={!anonymous}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="phone">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full p-2 border border-border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="address">
                              Address <span className="text-report-primary">*</span>
                            </label>
                            <input
                              type="text"
                              id="address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="w-full p-2 border border-border rounded-lg"
                              placeholder="Street address, unit/apt number"
                              required={!anonymous}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="animate-fade-in">
                <div className="bg-white rounded-xl border border-border shadow-elevation-1 p-6 space-y-6">
                  <h2 className="text-xl font-medium border-l-4 border-report-primary pl-3">
                    Review and submit your report
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                      <h3 className="font-medium">Issue Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Issue Type</p>
                          <p>{issueTypes.find(t => t.id === issueType)?.label || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Severity</p>
                          <p>{severityLevels.find(s => s.id === severity)?.label || '-'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p className="whitespace-pre-line">{description}</p>
                      </div>
                    </div>
                    
                    {photos.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-3">Photos ({photos.length})</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                          {photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo.preview}
                              alt={`Evidence ${index + 1}`}
                              className="h-20 w-full object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium mb-3">Contact Information</h3>
                      {anonymous ? (
                        <div className="bg-report-accent p-3 rounded-lg">
                          <p className="text-sm">You're reporting anonymously</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p>{name || '-'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p>{email || '-'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p>{phone || '-'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Address</p>
                            <p>{address || '-'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="agreed"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="h-4 w-4 mt-1 text-report-primary border-border rounded"
                          required
                        />
                        <label htmlFor="agreed" className="text-sm">
                          I confirm that the information provided is accurate to the best of my knowledge.
                          I understand that false reports may have legal consequences.
                          <span className="text-report-primary">*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="px-4 py-2 border border-border rounded-lg transition-colors hover:bg-accent"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="px-6 py-2 bg-report-primary text-white rounded-lg transition-colors hover:bg-report-dark"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-report-primary text-white rounded-lg transition-colors hover:bg-report-dark"
                >
                  Submit Report
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;

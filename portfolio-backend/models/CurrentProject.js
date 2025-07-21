const mongoose = require('mongoose');

const currentProjectSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  tagline: {
    type: String,
    maxlength: [200, 'Tagline cannot be more than 200 characters']
  },
  company: {
    name: String,
    logo: {
      public_id: String,
      url: String
    },
    website: String
  },
  
  // Project Details
  shortDescription: String,
  detailedDescription: String,
  problemStatement: String,
  solutionApproach: String,
  
  // Technical Details
  architectureDiagram: {
    public_id: String,
    url: String
  },
  technologies: {
    frontend: [{
      name: String,
      icon: String,
      purpose: String
    }],
    backend: [{
      name: String,
      icon: String,
      purpose: String
    }],
    database: [{
      name: String,
      icon: String,
      purpose: String
    }],
    infrastructure: [{
      name: String,
      icon: String,
      purpose: String
    }],
    devOps: [{
      name: String,
      icon: String,
      purpose: String
    }]
  },
  apiIntegrations: [{
    name: String,
    description: String,
    documentationUrl: String
  }],
  
  // Project Status
  status: {
    type: String,
    enum: ['research', 'design', 'development', 'testing', 'deployment', 'maintenance'],
    default: 'development'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  lastUpdated: Date,
  
  // Impact Metrics
  impactMetrics: [{
    name: String,
    value: String,
    description: String,
    icon: String
  }],
  kpis: [{
    name: String,
    currentValue: String,
    targetValue: String,
    unit: String
  }],
  testimonials: [{
    quote: String,
    author: String,
    role: String,
    company: String,
    avatar: {
      public_id: String,
      url: String
    }
  }],
  
  // Project Resources
  urls: {
    live: String,
    staging: String,
    documentation: String,
    repository: String,
    demo: String,
    caseStudy: String
  },
  documentation: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['technical', 'user', 'api', 'other']
    }
  }],
  
  // Team Information
  team: [{
    name: String,
    role: String,
    avatar: {
      public_id: String,
      url: String
    },
    contact: String,
    contribution: String
  }],
  myRole: {
    type: String,
    required: true
  },
  myContributions: [String],
  
  // Challenges & Solutions
  challenges: [{
    title: String,
    description: String,
    solution: String,
    technicalDetails: String,
    lessonsLearned: String
  }],
  
  // Visual Media
  media: {
    coverImage: {
      public_id: String,
      url: String
    },
    screenshots: [{
      public_id: String,
      url: String,
      caption: String,
      featureHighlighted: String
    }],
    videos: [{
      url: String,
      caption: String,
      thumbnail: {
        public_id: String,
        url: String
      }
    }],
    wireframes: [{
      public_id: String,
      url: String,
      caption: String,
      version: String
    }]
  },
  
  // Project Timeline
  timeline: {
    startDate: Date,
    estimatedCompletion: Date,
    milestones: [{
      name: String,
      date: Date,
      completed: Boolean,
      description: String,
      deliverables: [String]
    }],
    versionHistory: [{
      version: String,
      date: Date,
      changes: [String],
      status: String
    }]
  },
  
  // Future Roadmap
  roadmap: [{
    title: String,
    quarter: String,
    year: Number,
    features: [String],
    goals: [String]
  }],
  
  // Business Aspects
  businessModel: String,
  revenueImpact: String,
  costSavings: String,
  roi: String,
  
  // Engagement Metrics
  views: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  
  // SEO and Discovery
  keywords: [String],
  metaDescription: String,
  
  // Administrative
  isFeatured: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update progress based on feature completion
currentProjectSchema.methods.updateProgress = function() {
  if (this.features && this.features.length > 0) {
    const completedFeatures = this.features.filter(f => f.status === 'completed').length;
    this.progress = Math.round((completedFeatures / this.features.length) * 100);
  }
};

// Update lastUpdated before saving
currentProjectSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  this.updateProgress();
  next();
});

module.exports = mongoose.model('CurrentProject', currentProjectSchema);
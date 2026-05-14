const disorders = [

  // ================= MOOD =================
  {
    id: "depression",
    name: "Depression",
    category: "Mood",
    description: "Persistent sadness and loss of interest in daily life.",
    symptoms: ["Low mood", "Fatigue", "Hopelessness", "Sleep changes"],
    triggers: ["Stress", "Trauma", "Isolation", "Genetics"],
    coping: ["Therapy", "Exercise", "Routine", "Support system"],
    article: [
      "Depression is a long-lasting mood disorder that affects emotions, thinking, and behavior.",
      "It is more than sadness and can interfere with daily functioning.",
      "It develops due to biological, psychological, and social factors.",
      "Treatment includes therapy, lifestyle changes, and sometimes medication."
    ]
  },

  {
    id: "bipolar",
    name: "Bipolar Disorder",
    category: "Mood",
    description: "Extreme mood swings between mania and depression.",
    symptoms: ["High energy", "Low mood", "Impulsivity", "Sleep changes"],
    triggers: ["Stress", "Sleep loss", "Genetics"],
    coping: ["Medication", "Therapy", "Routine stability"],
    article: [
      "Bipolar disorder involves alternating manic and depressive episodes.",
      "Mania includes high energy and reduced sleep.",
      "Depression includes low mood and fatigue.",
      "Long-term treatment requires medication and therapy."
    ]
  },

  {
    id: "cyclothymia",
    name: "Cyclothymic Disorder",
    category: "Mood",
    description: "Mild but chronic mood fluctuations.",
    symptoms: ["Mood swings", "Emotional instability"],
    triggers: ["Stress", "Genetics"],
    coping: ["Therapy", "Mood tracking"],
    article: [
      "Cyclothymia is a milder form of bipolar disorder.",
      "It involves long-term emotional ups and downs.",
      "Symptoms are less severe but persistent.",
      "Therapy helps stabilize mood patterns."
    ]
  },

  // ================= ANXIETY =================
  {
    id: "anxiety",
    name: "Generalized Anxiety Disorder",
    category: "Anxiety",
    description: "Persistent excessive worry.",
    symptoms: ["Worry", "Restlessness", "Fatigue"],
    triggers: ["Stress", "Caffeine", "Trauma"],
    coping: ["Breathing techniques", "Therapy"],
    article: [
      "Generalized anxiety disorder involves chronic excessive worry.",
      "It affects both mind and body causing tension and fatigue.",
      "People often overthink everyday situations.",
      "Treatment includes therapy and relaxation techniques."
    ]
  },

  {
    id: "panic",
    name: "Panic Disorder",
    category: "Anxiety",
    description: "Sudden intense fear episodes.",
    symptoms: ["Chest pain", "Sweating", "Shortness of breath"],
    triggers: ["Stress", "Crowds", "Fear memory"],
    coping: ["Breathing control", "Exposure therapy"],
    article: [
      "Panic disorder causes sudden fear attacks.",
      "These attacks feel intense and physical.",
      "Avoidance of triggers is common.",
      "Therapy helps control panic responses."
    ]
  },

  {
    id: "phobia",
    name: "Specific Phobia",
    category: "Anxiety",
    description: "Intense fear of specific objects or situations.",
    symptoms: ["Fear response", "Avoidance"],
    triggers: ["Animals", "Heights", "Crowds"],
    coping: ["Exposure therapy", "Desensitization"],
    article: [
      "Phobias are irrational fears of specific triggers.",
      "Avoidance reinforces the fear.",
      "Symptoms can include panic and anxiety.",
      "Exposure therapy is highly effective."
    ]
  },

  {
    id: "ocd",
    name: "Obsessive Compulsive Disorder",
    category: "Anxiety",
    description: "Intrusive thoughts and repetitive behaviors.",
    symptoms: ["Obsessions", "Compulsions"],
    triggers: ["Stress", "Genetics"],
    coping: ["CBT", "Exposure therapy"],
    article: [
      "OCD involves unwanted intrusive thoughts.",
      "Compulsions reduce anxiety temporarily.",
      "It disrupts daily functioning.",
      "Therapy breaks obsession cycles."
    ]
  },

  // ================= TRAUMA =================
  {
    id: "ptsd",
    name: "PTSD",
    category: "Trauma",
    description: "Trauma-related psychological stress.",
    symptoms: ["Flashbacks", "Nightmares", "Avoidance"],
    triggers: ["War", "Accidents", "Abuse"],
    coping: ["Trauma therapy", "Support groups"],
    article: [
      "PTSD develops after traumatic experiences.",
      "It causes flashbacks and emotional distress.",
      "It affects memory and behavior.",
      "Therapy is essential for recovery."
    ]
  },

  {
    id: "acute-stress",
    name: "Acute Stress Disorder",
    category: "Trauma",
    description: "Short-term reaction to trauma.",
    symptoms: ["Anxiety", "Numbness"],
    triggers: ["Recent trauma"],
    coping: ["Early intervention", "Therapy"],
    article: [
      "Occurs shortly after trauma exposure.",
      "Symptoms resemble PTSD but are temporary.",
      "Early treatment prevents long-term effects.",
      "Support systems help recovery."
    ]
  },

  // ================= PSYCHOTIC =================
  {
    id: "schizophrenia",
    name: "Schizophrenia",
    category: "Psychotic",
    description: "Distorted perception of reality.",
    symptoms: ["Hallucinations", "Delusions"],
    triggers: ["Genetics", "Brain chemistry"],
    coping: ["Medication", "Therapy"],
    article: [
      "Schizophrenia affects perception of reality.",
      "Hallucinations and delusions are common.",
      "It impacts daily functioning.",
      "Long-term treatment is required."
    ]
  },

  // ================= NEURODEVELOPMENTAL =================
  {
    id: "adhd",
    name: "ADHD",
    category: "Neurodevelopmental",
    description: "Attention and impulse control disorder.",
    symptoms: ["Inattention", "Hyperactivity"],
    triggers: ["Genetics", "Brain development"],
    coping: ["Behavioral therapy", "Structure"],
    article: [
      "ADHD affects attention and focus.",
      "It begins in childhood.",
      "It impacts organization and behavior.",
      "Support improves functioning."
    ]
  },

  {
    id: "autism",
    name: "Autism Spectrum Disorder",
    category: "Neurodevelopmental",
    description: "Differences in communication and behavior.",
    symptoms: ["Social difficulty", "Repetitive behavior"],
    triggers: ["Genetics", "Development"],
    coping: ["Therapy", "Support systems"],
    article: [
      "Autism affects communication and interaction.",
      "It exists on a spectrum.",
      "Early support improves outcomes.",
      "Individuals have unique strengths."
    ]
  },

  // ================= EATING =================
  {
    id: "anorexia",
    name: "Anorexia Nervosa",
    category: "Eating",
    description: "Severe restriction of food intake.",
    symptoms: ["Low weight", "Fear of weight gain"],
    triggers: ["Body image pressure"],
    coping: ["Therapy", "Nutrition support"],
    article: [
      "Anorexia involves extreme food restriction.",
      "It is driven by fear of weight gain.",
      "It can become life-threatening.",
      "Treatment requires medical care."
    ]
  },

  {
    id: "bulimia",
    name: "Bulimia Nervosa",
    category: "Eating",
    description: "Binge eating followed by purging.",
    symptoms: ["Binge eating", "Purging"],
    triggers: ["Stress", "Body image issues"],
    coping: ["Therapy", "Behavioral treatment"],
    article: [
      "Bulimia involves binge-purge cycles.",
      "It is linked to emotional distress.",
      "It affects physical health.",
      "Therapy helps recovery."
    ]
  },

  // ================= PERSONALITY =================
  {
    id: "bpd",
    name: "Borderline Personality Disorder",
    category: "Personality",
    description: "Emotional instability and impulsive behavior.",
    symptoms: ["Mood swings", "Fear of abandonment"],
    triggers: ["Trauma", "Stress"],
    coping: ["DBT therapy", "Emotion regulation"],
    article: [
      "BPD affects emotional stability.",
      "It causes intense relationships.",
      "Fear of abandonment is common.",
      "Therapy helps emotional control."
    ]
  },
  
{
  id: "burnout",
  name: "Burnout Syndrome",
  description: "A state of emotional, physical, and mental exhaustion caused by prolonged workplace stress.",
  symptoms: ["fatigue", "loss of motivation", "irritability", "reduced performance"],
  triggers: ["overwork", "lack of rest", "high workload", "no boundaries"],

  copingStrategies: [
    "Take structured breaks during work hours",
    "Set clear work-life boundaries",
    "Reduce workload where possible",
    "Sleep restoration (7–9 hours)",
    "Talk to a counselor or supervisor early"
  ]
},
{
  id: "work_stress",
  name: "Workplace Stress",
  description: "Stress caused by pressure, deadlines, and demanding work environments.",
  symptoms: ["headaches", "anxiety", "sleep issues", "tension"],
  triggers: ["deadlines", "micromanagement", "job insecurity", "long hours"],

  copingStrategies: [
    "Break tasks into smaller steps",
    "Use time management techniques (Pomodoro)",
    "Practice breathing exercises",
    "Ask for workload prioritization",
    "Take short mental resets during the day"
  ]
},

  // =========================
  // 🏢 WORKLOAD & BURNOUT
  // =========================

  {
    id: "burnout",
    category: "Workload & Burnout",
    name: "Burnout Syndrome",
    description: "Chronic workplace exhaustion caused by prolonged stress.",
    symptoms: ["fatigue", "loss of motivation", "irritability"],
    triggers: ["overwork", "no rest", "high workload"],
    copingStrategies: [
      "Take structured breaks",
      "Set work-life boundaries",
      "Reduce workload",
      "Sleep properly (7–9 hours)",
      "Seek counseling support"
    ]
  },

  {
    id: "work_fatigue",
    category: "Workload & Burnout",
    name: "Work Fatigue Syndrome",
    description: "Extreme tiredness caused by prolonged work pressure.",
    symptoms: ["constant tiredness", "slow thinking", "low energy"],
    triggers: ["long shifts", "no rest", "overworking"],
    copingStrategies: [
      "Rest cycles",
      "Hydration",
      "Sleep hygiene",
      "Break scheduling"
    ]
  },

  {
    id: "deadline_exhaustion",
    category: "Workload & Burnout",
    name: "Deadline Exhaustion Disorder",
    description: "Stress caused by constant tight deadlines.",
    symptoms: ["panic", "overthinking", "fatigue"],
    triggers: ["urgent deadlines", "pressure", "work overload"],
    copingStrategies: [
      "Time blocking",
      "Task prioritization",
      "Early planning",
      "Break tasks into smaller steps"
    ]
  },

  // =========================
  // 😰 STRESS & ANXIETY
  // =========================

  {
    id: "work_stress",
    category: "Stress & Anxiety",
    name: "Workplace Stress",
    description: "Stress caused by pressure and demanding work environments.",
    symptoms: ["headaches", "anxiety", "sleep issues"],
    triggers: ["deadlines", "micromanagement", "job insecurity"],
    copingStrategies: [
      "Breathing exercises",
      "Task breakdown",
      "Time management",
      "Short breaks",
      "Seek support"
    ]
  },

  {
    id: "performance_anxiety",
    category: "Stress & Anxiety",
    name: "Performance Anxiety",
    description: "Fear of failure under work pressure.",
    symptoms: ["self-doubt", "panic", "overthinking"],
    triggers: ["evaluations", "targets", "competition"],
    copingStrategies: [
      "Practice preparation",
      "Positive reframing",
      "Gradual exposure",
      "Feedback early",
      "Relaxation techniques"
    ]
  },

  // =========================
  // 🧨 TOXIC WORK ENVIRONMENT
  // =========================

  {
    id: "toxic_workplace",
    category: "Toxic Environment",
    name: "Toxic Workplace Exposure",
    description: "Stress caused by harmful or hostile workplaces.",
    symptoms: ["low morale", "anger", "withdrawal"],
    triggers: ["bullying", "bad leadership", "conflict"],
    copingStrategies: [
      "Document incidents",
      "Seek HR support",
      "Set boundaries",
      "Avoid toxic interaction",
      "Plan exit if necessary"
    ]
  },

  // =========================
  // 🌐 REMOTE WORK
  // =========================

  {
    id: "remote_isolation",
    category: "Remote & Isolation",
    name: "Remote Work Isolation",
    description: "Loneliness from working alone remotely.",
    symptoms: ["loneliness", "low motivation", "fatigue"],
    triggers: ["no interaction", "long remote hours"],
    copingStrategies: [
      "Virtual check-ins",
      "Work in shared spaces",
      "Social breaks",
      "Outdoor activity",
      "Video communication"
    ]
  },



  // ======================================================
  // 🏋️ CATEGORY 1: WORKLOAD & BURNOUT
  // ======================================================

  {
    id: "burnout",
    category: "Workload & Burnout",
    name: "Burnout Syndrome",
    description: "Chronic exhaustion caused by prolonged workplace stress.",
    symptoms: ["fatigue", "loss of motivation", "irritability"],
    triggers: ["overwork", "no rest", "high workload"],
    copingStrategies: [
      "Take structured breaks",
      "Set boundaries",
      "Reduce workload",
      "Sleep recovery",
      "Seek counseling"
    ]
  },

  {
    id: "overwork_fatigue",
    category: "Workload & Burnout",
    name: "Overwork Fatigue Syndrome",
    description: "Physical and mental exhaustion from excessive working hours.",
    symptoms: ["constant tiredness", "slow thinking", "body weakness"],
    triggers: ["long shifts", "no rest days"],
    copingStrategies: ["rest cycles", "sleep regulation", "work redistribution"]
  },

  {
    id: "deadline_exhaustion",
    category: "Workload & Burnout",
    name: "Deadline Exhaustion Disorder",
    description: "Stress caused by repeated tight deadlines.",
    symptoms: ["panic", "fatigue", "overthinking"],
    triggers: ["urgent deadlines", "pressure"],
    copingStrategies: ["task breakdown", "time management", "early planning"]
  },

  {
    id: "recovery_deficit",
    category: "Workload & Burnout",
    name: "Work Recovery Deficit",
    description: "Inability to recover from continuous work stress.",
    symptoms: ["emotional numbness", "exhaustion"],
    triggers: ["no rest periods"],
    copingStrategies: ["mandatory rest", "leave days", "workload balancing"]
  },

  {
    id: "digital_fatigue",
    category: "Workload & Burnout",
    name: "Digital Work Fatigue",
    description: "Burnout caused by excessive screen-based work.",
    symptoms: ["eye strain", "mental fog", "headaches"],
    triggers: ["screen overload"],
    copingStrategies: ["screen breaks", "20-20-20 rule", "offline time"]
  },


  // ======================================================
  // 😰 CATEGORY 2: STRESS & ANXIETY
  // ======================================================

  {
    id: "work_stress",
    category: "Stress & Anxiety",
    name: "Workplace Stress",
    description: "Stress caused by demanding job environments.",
    symptoms: ["headaches", "anxiety", "sleep issues"],
    triggers: ["deadlines", "micromanagement"],
    copingStrategies: ["breathing exercises", "task prioritization", "breaks"]
  },

  {
    id: "performance_anxiety",
    category: "Stress & Anxiety",
    name: "Performance Anxiety",
    description: "Fear of failing at work tasks or evaluations.",
    symptoms: ["panic", "self-doubt"],
    triggers: ["assessments", "targets"],
    copingStrategies: ["practice", "positive thinking", "feedback sessions"]
  },

  {
    id: "workplace_panic",
    category: "Stress & Anxiety",
    name: "Workplace Panic Response",
    description: "Sudden anxiety attacks triggered at work.",
    symptoms: ["rapid heartbeat", "fear", "confusion"],
    triggers: ["pressure situations"],
    copingStrategies: ["grounding techniques", "breathing control"]
  },

  {
    id: "evaluation_anxiety",
    category: "Stress & Anxiety",
    name: "Evaluation Anxiety Disorder",
    description: "Stress before performance reviews.",
    symptoms: ["nervousness", "overthinking"],
    triggers: ["appraisals"],
    copingStrategies: ["mock preparation", "stress training"]
  },


  // ======================================================
  // 🧨 CATEGORY 3: TOXIC WORK ENVIRONMENT
  // ======================================================

  {
    id: "toxic_workplace",
    category: "Toxic Environment",
    name: "Toxic Workplace Exposure",
    description: "Stress caused by harmful work environments.",
    symptoms: ["withdrawal", "anger"],
    triggers: ["bullying", "bad leadership"],
    copingStrategies: ["document issues", "seek HR help", "set boundaries"]
  },

  {
    id: "workplace_bullying",
    category: "Toxic Environment",
    name: "Workplace Bullying Stress",
    description: "Emotional damage from workplace harassment.",
    symptoms: ["fear", "avoidance"],
    triggers: ["harassment", "humiliation"],
    copingStrategies: ["report incidents", "support systems"]
  },

  {
    id: "micromanagement_stress",
    category: "Toxic Environment",
    name: "Micromanagement Stress Disorder",
    description: "Stress caused by excessive supervision.",
    symptoms: ["frustration", "low confidence"],
    triggers: ["constant monitoring"],
    copingStrategies: ["clarify expectations", "structured reporting"]
  },

  {
    id: "conflict_saturation",
    category: "Toxic Environment",
    name: "Conflict Saturation Syndrome",
    description: "Mental exhaustion from continuous workplace conflict.",
    symptoms: ["anger", "stress"],
    triggers: ["arguments", "team conflict"],
    copingStrategies: ["mediation", "communication boundaries"]
  },


  // ======================================================
  // 🌐 CATEGORY 4: REMOTE & ISOLATION
  // ======================================================

  {
    id: "remote_isolation",
    category: "Remote & Isolation",
    name: "Remote Work Isolation",
    description: "Loneliness from working alone remotely.",
    symptoms: ["loneliness", "low motivation"],
    triggers: ["no interaction"],
    copingStrategies: ["team calls", "coworking spaces", "social breaks"]
  },

  {
    id: "digital_isolation",
    category: "Remote & Isolation",
    name: "Digital Isolation Syndrome",
    description: "Emotional disconnection from virtual work environments.",
    symptoms: ["detachment", "fatigue"],
    triggers: ["fully remote work"],
    copingStrategies: ["hybrid interaction", "meetups"]
  },

  {
    id: "communication_gap_stress",
    category: "Remote & Isolation",
    name: "Communication Gap Stress",
    description: "Stress caused by poor remote communication.",
    symptoms: ["confusion", "frustration"],
    triggers: ["unclear messages"],
    copingStrategies: ["structured updates", "video calls"]
  },


  // ======================================================
  // 📈 CATEGORY 5: CAREER PRESSURE
  // ======================================================

  {
    id: "career_pressure",
    category: "Career Pressure",
    name: "Career Pressure Anxiety",
    description: "Stress caused by high expectations at work.",
    symptoms: ["overthinking", "fear of failure"],
    triggers: ["targets", "competition"],
    copingStrategies: ["goal setting", "self-paced growth"]
  },

  {
    id: "job_security_anxiety",
    category: "Career Pressure",
    name: "Job Security Anxiety",
    description: "Fear of losing employment.",
    symptoms: ["worry", "stress"],
    triggers: ["layoffs", "uncertainty"],
    copingStrategies: ["skill upgrading", "financial planning"]
  },

  {
    id: "career_stagnation",
    category: "Career Pressure",
    name: "Career Stagnation Stress",
    description: "Feeling stuck in career growth.",
    symptoms: ["low motivation"],
    triggers: ["no promotions"],
    copingStrategies: ["mentorship", "training"]
  },

  {
    id: "ai_job_fear",
    category: "Career Pressure",
    name: "AI Job Replacement Anxiety",
    description: "Fear of being replaced by automation.",
    symptoms: ["fear", "uncertainty"],
    triggers: ["AI adoption"],
    copingStrategies: ["reskilling", "tech adaptation"]
  },

  {
    id: "work_identity_crisis",
    category: "Career Pressure",
    name: "Work Identity Crisis",
    description: "Loss of personal identity due to work pressure.",
    symptoms: ["confusion", "stress"],
    triggers: ["over-identification with job"],
    copingStrategies: ["career counseling", "life balance"]
  }






];

export default disorders;
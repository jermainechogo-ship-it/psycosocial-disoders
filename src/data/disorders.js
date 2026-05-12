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
  }

];

export default disorders;
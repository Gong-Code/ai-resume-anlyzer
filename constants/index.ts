export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "4",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "5",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "6",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
  companyName = null,
  jobTitle,
  jobDescription,
  AIResponseFormat: format = AIResponseFormat,
}: {
  companyName?: string | null;
  jobTitle: string | null;
  jobDescription: string | null;
  AIResponseFormat?: string;
}) =>
  [
    "You are a senior recruiter and ATS (Applicant Tracking System) specialist with 15+ years of experience in talent acquisition and resume screening.",
    "",
    "## Context",
    companyName ? `Company: ${companyName}` : "",
    jobTitle ? `Target Role: ${jobTitle}` : "",
    jobDescription ? `Job Description:\n${jobDescription}` : "",
    "",
    "## Task",
    "Analyze the attached resume thoroughly and provide a structured evaluation.",
    "Please analyze and rate this resume and suggest how to improve it.",
    "The rating can be low if the resume is bad.",
    "Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.",
    "If there is a lot to improve, don't hesitate to give low scores. This is to help the user improve their resume.",
    "",
    "## Required Output",
    "",
    "### 1. ATS Compatibility Score (0-100)",
    "- Rate how likely this resume is to pass common ATS filters (e.g., Workday, Greenhouse, Lever).",
    "- Flag formatting issues that cause parsing failures: tables, columns, headers/footers, images, special characters, non-standard section headings.",
    "",
    "### 2. Keyword Match Analysis",
    "- List the critical keywords and phrases from the job description.",
    "- Identify which keywords are present in the resume and which are missing.",
    "- Suggest where and how to naturally incorporate missing keywords.",
    "",
    "### 3. Section-by-Section Review",
    "For each resume section (Summary, Experience, Skills, Education, etc.):",
    "- Strengths: what works well.",
    "- Weaknesses: what needs improvement.",
    "- Specific rewrite suggestions with before/after examples.",
    "",
    "### 4. Impact & Metrics",
    "- Identify bullet points that lack quantifiable achievements.",
    "- Suggest how to add metrics (percentages, dollar amounts, team sizes, timelines).",
    "",
    "### 5. Overall Recommendations",
    "- Top 3 highest-priority changes to make.",
    "- Any red flags a recruiter would notice (gaps, job hopping, vague descriptions).",
    "- Tailoring advice specific to the target company and role.",
    "",
    `Provide the feedback using the following format: ${format}`,
    "Return the analysis as a JSON object, without any other text and without the backticks.",
    "Do not include any other text or comments.",
  ]
    .filter(Boolean)
    .join("\n");

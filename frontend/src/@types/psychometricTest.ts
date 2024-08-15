interface Score {
    category: string;
    score: number;
  }
  
  interface Option {
    _id:string;
    text: string;
    scores: Score[];
  }
  
  export  interface IPsychometricQuestion {
    _id:string,
    question: string;
    options: Option[];
  }
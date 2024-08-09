import ExpertIntro from "../../components/student/ExpertListing/ExpertIntro";
import ExpertsList from "../../components/student/ExpertListing/ExpertsList";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findExpertBySubCategory } from "../../services/api/studentApi";
import { IExpert } from "../../@types/expert";


const ExpertListing = () => {
  const { subCatName } = useParams();
  const [expets, setExperts] = useState<IExpert[]>([])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchexperts = async () => {
      if (subCatName) {
        const result = await findExpertBySubCategory(subCatName);
        setExperts(result.data);
      }
    };
    fetchexperts();
  }, [subCatName]);

  return (
    <div>
 
      <ExpertIntro />
      <ExpertsList expets={expets} />
    
    </div>
  );
};

export default ExpertListing;

import { useAppSelector } from "../../hooks/useTypeSelector";

const ExpertProfile: React.FC = () => {
  const { expert } = useAppSelector((state) => state.expert);

  return (
    <div className="min-h-screen p-4 ms-12  w-11/12 flex justify-center ">
      {expert ? (
        <div className="container mx-auto bg-white p-6 rounded-lg border shadow-md ">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Expert Details
          </h1>
          <img
            src={
              typeof expert.profile_picture === "string"
                ? expert.profile_picture
                : URL.createObjectURL(expert.profile_picture)
            }
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <div className="grid grid-cols  gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
            <div className=" ">
              <h2 className="font-semibold p-2 ">Username:-</h2>
              <p className="p-3 border rounded-lg shadow-md">
                {expert.user_name}
              </p>
            </div>
            <div>
              <h2 className="font-semibold p-2">Email:</h2>
              <p className="p-3 border rounded-lg shadow-md">{expert.email}</p>
            </div>
            <div>
              <h2 className="font-semibold">Phone Number:</h2>
              <p className="p-3 border rounded-lg shadow-md">{expert.phoneNumber}</p>
            </div>
            <div className="">
              <h2 className="font-semibold">Personal Bio:</h2>
              <p className="p-3 border rounded-lg shadow-md">{expert.personal_bio}</p>
            </div>
            <div>
              <h2 className="font-semibold">Area of Expertise:</h2>
              <p className="p-3 border rounded-lg shadow-md">
                {expert.area_of_expertise}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Consultation Fee:</h2>
              <p className="p-3 border rounded-lg ">
                {expert.consultation_fee}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Educational Background:</h2>
              <p className="p-3 border rounded-lg shadow-md">
                {expert.educationBackground}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Category:</h2>
              <p className="p-3 border rounded-lg shadow-md">{expert.sub_category_id}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Expert not found</p>
      )}
    </div>
  );
};

export default ExpertProfile;

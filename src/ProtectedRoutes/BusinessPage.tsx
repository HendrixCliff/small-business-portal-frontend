import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch} from "./../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchBusiness } from "../redux/businessSlice";

const BusinessPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { business, loading, error } = useAppSelector((state) => state.business);

  useEffect(() => {
    if (slug) {
      dispatch(fetchBusiness(slug));
    }
  }, [dispatch, slug]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 className="text-red-500">{error}</h2>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{business?.name}</h1>
      <p className="text-gray-600">{business?.description}</p>
      <p><strong>Contact:</strong> {business?.contact}</p>
      <p><strong>Location:</strong> {business?.location}</p>
      {business?.logo && <img src={business.logo} alt={business.name} className="w-40 mt-4" />}
    </div>
  );
};

export default BusinessPage;

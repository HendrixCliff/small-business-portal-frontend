import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchBusinesses, filterBusinesses } from "../redux/businessListSlice";
import BusinessSearch from "../ProtectedRoutes/BusinessSearch";
import { useAppSelector } from "../hooks/useAppSelector";
import { Business } from "./../redux/businessListSlice"

const BusinessList = () => {
  const dispatch = useAppDispatch();
  const { businesses, loading, error } = useAppSelector((state) => state.businesses);

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(filterBusinesses(query));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 className="text-red-500">{error}</h2>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BusinessSearch onSearch={handleSearch} />
      {businesses.length === 0 ? (
        <p className="text-gray-500">No businesses found.</p>
      ) : (
        businesses.map((business: Business) => (
            <div key={business._id} className="border p-4 rounded mb-2">
              <h3 className="text-xl">{business.name}</h3>
              <p>{business.description}</p>
            </div>
        ))
      )}
    </div>
  );
};

export default BusinessList;

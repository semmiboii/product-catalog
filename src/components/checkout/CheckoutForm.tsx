import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

import { CartState } from "../../redux/slices/cart-slice";
import { Reducers } from "../../redux/store";
import { newOrder } from "../../redux/slices/order-slice";

interface FormSchema {
  name: string;
  address: string;
  email: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
}

interface CheckoutFormProps {
  onClick: () => void;
}

const formSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(2),
  email: z.string().email(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  pincode: z.string(),
});

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClick }) => {
  const dispatch = useDispatch();

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const cart: CartState = useSelector((state: Reducers) => state.cart);

  const [formData, setFormData] = useState<FormSchema>({
    name: "",
    address: "",
    email: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (formData.country) {
      const countryStates = State.getStatesOfCountry(formData.country);
      setStates(countryStates);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      const stateCities = City.getCitiesOfState(
        formData.country,
        formData.state
      );
      setCities(stateCities);
    }
  }, [formData.state, formData.country]);

  const handleCountryChange = (event: { target: { value: any } }) => {
    const countryIsoCode = event.target.value;
    setFormData({ ...formData, country: countryIsoCode, state: "", city: "" });
  };

  const handleStateChange = (event: { target: { value: string } }) => {
    const stateIsoCode = event.target.value;
    setFormData({
      ...formData,
      state: stateIsoCode,
      city: "",
    });
  };

  const handleCityChange = (event: { target: { value: string } }) => {
    const cityName = event.target.value;

    setFormData({
      ...formData,
      city: cityName,
    });
  };

  const handleFormDataChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      const parsedData = formSchema.parse(formData);
      if (parsedData) {
        toast.success("ADDRESS ADDED.");
      }
      onClick();
      const orderItem = {
        orders: cart.items,
        customer: formData,
      };
      dispatch(newOrder(orderItem));
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <form
      className="bg-gray-200 drop-shadow-md shadow-md p-4 flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label className="font-lato font-bold text-md" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="border-none p-2 font-lato outline-none"
          placeholder="Name"
          onChange={handleFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-lato font-bold text-md" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          name="address"
          className="border-none p-2 font-lato outline-none"
          placeholder="Address"
          onChange={handleFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-lato font-bold text-md" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          name="email"
          className="border-1 p-2 border-gray-300 font-lato outline-none"
          placeholder="Email"
          onChange={handleFormDataChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-lato font-bold text-md" htmlFor="country">
            Country
          </label>
          <select
            name="country"
            className="border-1 p-2 border-gray-300 font-lato outline-none bg-white"
            onChange={handleCountryChange}
          >
            {countries.length === 0 && <option>Select Country</option>}
            {countries.length !== 0 &&
              countries.map((country: ICountry) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-lato font-bold text-md" htmlFor="state">
            State
          </label>
          <select
            name="state"
            className="border-1 p-2 border-gray-300 font-lato outline-none bg-white"
            onChange={handleStateChange}
          >
            {states.length === 0 && <option>Select State</option>}
            {states.length !== 0 &&
              states.map((state: IState) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-lato font-bold text-md" htmlFor="city">
            City
          </label>
          <select
            name="city"
            className="border-1 p-2 border-gray-300 font-lato outline-none bg-white"
            onChange={handleCityChange}
          >
            {cities.length === 0 && <option>Select City</option>}
            {cities.length !== 0 &&
              cities.map((city: ICity) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-lato font-bold text-md" htmlFor="pincode">
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            className="border-1 p-2 border-gray-300 font-lato outline-none bg-white"
            onChange={handleFormDataChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-lato font-bold text-md" htmlFor="phone">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          className="border-1 p-2 border-gray-300 font-lato outline-none bg-white"
          onChange={handleFormDataChange}
        />
      </div>
      <button className="bg-emerald-400 p-4 font-bold active:bg-lime-400">
        CHECKOUT
      </button>
    </form>
  );
};

export default CheckoutForm;

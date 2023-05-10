export class Service {
  getPhones = async () => {
    try {
      const res = await axios({
        url: "https://643e1144c72fda4a0becfbc4.mockapi.io/product",
        method: "GET",
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  getPhoneById = async (id) => {
    try {
      const res = await axios({
        url: `https://643e1144c72fda4a0becfbc4.mockapi.io/product/${id}`,
        method: "GET",
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
}

import productApi from "api/productApi";
import { useEffect } from "react";
import { useState } from "react";

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let result;
    (async () => {
      try {
        setLoading(true);
        result = await productApi.get(productId);
        setProduct(result);
      } catch (error) {
        console.log("Failed to fetch product: ", error);
      }
      setLoading(false);
    })();
    return () => {
      result = {};
    };
  }, [productId]);

  return {
    product,
    loading,
  };
}

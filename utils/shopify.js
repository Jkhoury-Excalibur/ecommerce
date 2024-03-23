async function fetchProducts() {
  console.log("Fetching products..."); // Log when starting to fetch products
  const query = `{
  products(first: 10, query: "tag:Featured") {
    edges {
      node {
        id
        title
        description
        images(first: 1) {
          edges {
            node {
              src
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`;

  try {
    const response = await fetch(
      "https://excaliburinteractive.myshopify.com/api/2021-10/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "59c9428ab5dd37abcd98c49f16097e77",
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      console.error(
        `API call failed with status: ${response.status} and statusText: ${response.statusText}`
      );
      return [];
    }

    const jsonResponse = await response.json();
    console.log("API response:", jsonResponse); // Log the raw API response

    // Check for errors in the API response and log them
    if (jsonResponse.errors) {
      console.error("API errors:", jsonResponse.errors);
      return [];
    }

    if (
      !jsonResponse ||
      !jsonResponse.data ||
      !jsonResponse.data.products ||
      !jsonResponse.data.products.edges
    ) {
      console.error("Unexpected API response format:", jsonResponse);
      return [];
    }

    const products = jsonResponse.data.products.edges.map((edge) => ({
      id: edge.node.id,
      name: edge.node.title,
      description: edge.node.description,
      imageUrl: edge.node.images.edges[0]?.node.src,
      minVariantPrice: {
        amount: edge.node.priceRange.minVariantPrice.amount,
        currencyCode: edge.node.priceRange.minVariantPrice.currencyCode,
      },
    }));

    console.log("Processed products:", products); // Log the processed products array
    return products;
  } catch (error) {
    console.error("Error fetching products:", error); // Log any errors encountered during the fetch
    return [];
  }
}
export { fetchProducts };

async function fetchProductsFromCollection(collectionHandle) {
  const query = `{
    collectionByHandle(handle: "${collectionHandle}") {
      title
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch(
      "https://excaliburinteractive.myshopify.com/api/2021-10/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "59c9428ab5dd37abcd98c49f16097e77",
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      console.error(
        `API call failed with status: ${response.status} and statusText: ${response.statusText}`
      );
      return [];
    }

    const jsonResponse = await response.json();
    console.log("API response:", jsonResponse); // Log the raw API response

    if (jsonResponse.errors) {
      console.error("API errors:", jsonResponse.errors);
      return [];
    }

    if (
      !jsonResponse ||
      !jsonResponse.data ||
      !jsonResponse.data.collectionByHandle ||
      !jsonResponse.data.collectionByHandle.products ||
      !jsonResponse.data.collectionByHandle.products.edges
    ) {
      console.error("Unexpected API response format:", jsonResponse);
      return [];
    }

    const products = jsonResponse.data.collectionByHandle.products.edges.map(
      (edge) => ({
        id: edge.node.id,
        name: edge.node.title,
        description: edge.node.description,
        imageUrl: edge.node.images.edges[0]?.node.src, // Assuming you want the first image
        minVariantPrice: {
          amount: edge.node.priceRange.minVariantPrice.amount,
          currencyCode: edge.node.priceRange.minVariantPrice.currencyCode,
        },
      })
    );

    console.log("Processed products:", products); // Log the processed products array
    return products;
  } catch (error) {
    console.error("Error fetching products:", error); // Log any errors encountered during the fetch
    return [];
  }
}

export { fetchProductsFromCollection };

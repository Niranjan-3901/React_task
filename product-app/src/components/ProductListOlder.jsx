// import { Autocomplete, Box, Button, Container, Grid, Slider, TextField, Typography } from '@mui/material';
// import MuiInput from '@mui/material/Input';
// import { styled } from '@mui/material/styles';
// import React, { useEffect, useState } from 'react';
// import { GoSortAsc, GoSortDesc } from "react-icons/go";
// import ProductCard from "./ProductCard";
// import SliderComponent from './SliderComponent';
// import axios from "axios";


// function ProductList() {
//     const [productList, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [filters, setFilters] = useState({
//         category: null,
//         company: null,
//         rating: null,
//         priceRange: null,
//         availability: null
//     });
//     const [sortOption, setSortOption] = useState(null);
//     const [sortBasis, setSortBasis] = useState("Ascending")

//     const handleResetButtonClick = () => {
//         setFilters({
//             category: null,
//             company: null,
//             rating: null,
//             priceRange: null,
//             availability: null
//         });
//         setSortOption(null);
//         setSortBasis("Ascending")
//     };

//     useEffect(() => {
//         fetch('https://json-server.bytexl.app/products')
//             .then(response => response.json())
//             .then(data => {
//                 setProducts(data);
//                 setFilteredProducts(data);
//             });
//     }, []);

//     const axiosClient = axios.create({baseURL:"/"})

//     const handleFilterChange = (name, value) => {
//         setFilters(prevFilters => ({
//             ...prevFilters,
//             [name]: value
//         }));
//     };

//     const handleSliderRangeChange=(sliderValue)=>{
//         setFilters(prevFilters => ({
//             ...prevFilters,
//             priceRange: sliderValue
//         }));
//     }

//     const applyFilters = () => {
//         let filtered = [...productList];


//         if (filters.category) {
//             filtered = filtered.filter(
//                 product =>
//                     filters.category === "All" ?
//                         true : product.category === filters.category
//             );
//         }

//         if (filters.company) {
//             filtered = filtered.filter(
//                 product =>
//                     filters.company === "All" ?
//                         true : product.company === filters.company
//             );
//         }

//         if (filters.rating) {
//             filtered = filtered.filter(
//                 product =>
//                     filters.rating === "All" ?
//                         true : product.rating >= filters.rating
//             );
//         }

//         if (filters.priceRange) {
//             const [min, max] = filters.priceRange
//             filtered = filtered.filter(
//                 product =>
//                     product.price >= min && product.price <= max
//             );
//         }

//         if (filters.availability) {
//             filtered = filtered.filter(product =>
//                 filters.availability === "All" ?
//                     true : product.availability === filters.availability
//             );
//         }

//         if (sortOption) {
//             filtered.sort((a, b) => {
//                 if (sortOption === 'price') {
//                     return a.price - b.price;
//                 } else if (sortOption === 'rating') {
//                     return b.rating - a.rating;
//                 } else if (sortOption === 'discount') {
//                     return b.discount - a.discount;
//                 } else if (sortOption === 'name') {
//                     return a.productName.localeCompare(b.productName);
//                 }
//                 return 0;
//             });
//             if (sortBasis === "Descending") filtered.reverse()
//         }
//         setFilteredProducts(filtered);
//     };

//     useEffect(() => {
//         applyFilters();
//     }, [filters, sortOption, sortBasis]);

//     const findUniqueElementsList = (value) => {
//         let uniqueElements = ["All"];
//         productList.forEach((productItem) => {
//             if (!uniqueElements.includes(productItem[value])) {
//                 uniqueElements.push(productItem[value]);
//             }
//         });
//         return uniqueElements;
//     };

//     const handleAutoCompleteValueChange = (event, newValue, name) => {
//         handleFilterChange(name, newValue);
//     };

//     if (!filteredProducts) return <div>Loading...</div>;

//     return (
//         <Container>
//             <Box
//                 sx={
//                     {
//                         "display": "flex",
//                         "justifyContent": "space-between",
//                         "alignItems": "center",
//                         "height": "fit-content"
//                     }
//                 }
//             >
//                 <h1 >All Products</h1>
//                 <Button
//                     variant='outlined'
//                     onClick={() => handleResetButtonClick()}
//                 >
//                     Clear Filters
//                 </Button>
//             </Box>
//             <Grid container spacing={2}>
//                 <Grid item xs={12} padding={"0 28px"}
//                     sx={
//                         {
//                             backgroundColor: "white"
//                         }
//                     }
//                 >
//                     <Box
//                         display={'flex'}
//                         justifyContent={"space-between"}>
//                         <Autocomplete
//                             disablePortal
//                             id="combo-box-demo"
//                             value={filters.category}
//                             onChange={(event, newValue) => {
//                                 handleAutoCompleteValueChange(event, newValue, "category");
//                             }}
//                             options={findUniqueElementsList("category")}
//                             sx={{ width: 200 }}
//                             isOptionEqualToValue={(option, value) => option === value}
//                             renderInput={(params) => <TextField {...params} label="Category" />}
//                         />
//                         <Autocomplete
//                             disablePortal
//                             id="combo-box-demo"
//                             value={filters.company}
//                             onChange={(event, newValue) => {
//                                 handleAutoCompleteValueChange(event, newValue, "company");
//                             }}
//                             options={findUniqueElementsList("company")}
//                             sx={{ width: 150 }}
//                             isOptionEqualToValue={(option, value) => option === value}
//                             renderInput={(params) => <TextField {...params} label="Company" />}
//                         />
//                         <Autocomplete
//                             disablePortal
//                             id="combo-box-demo"
//                             value={filters.rating}
//                             onChange={(event, newValue) => {
//                                 handleAutoCompleteValueChange(event, newValue, "rating");
//                             }}
//                             options={findUniqueElementsList("rating").map((ele) => `${ele}`)}
//                             sx={{ width: 150 }}
//                             isOptionEqualToValue={(option, value) => option === value}
//                             renderInput={(params) => <TextField {...params} label="Rating" />}
//                         />
//                         <Autocomplete
//                             disablePortal
//                             id="combo-box-demo"
//                             value={filters.availability}
//                             onChange={(event, newValue) => {
//                                 handleAutoCompleteValueChange(event, newValue, "availability");
//                             }}
//                             options={findUniqueElementsList("availability")}
//                             getOptionLabel={(option) => option === "yes" ? "Stock Available" : option === "no" ? "Out of Stock" : "All"}
//                             sx={{ width: 150 }}
//                             isOptionEqualToValue={(option, value) => option === value}
//                             renderInput={(params) => <TextField {...params} label="Availability" />}
//                         />
//                         <Autocomplete
//                             disablePortal
//                             value={sortOption}
//                             id="combo-box-demo"
//                             onChange={(event, newValue) => {
//                                 setSortOption(newValue);
//                             }}
//                             options={
//                                 [
//                                     "name",
//                                     "price",
//                                     "rating",
//                                     "discount"
//                                 ]
//                             }
//                             getOptionLabel={(option) => option}
//                             sx={{ width: 150 }}
//                             isOptionEqualToValue={(option, value) => option === value}
//                             renderInput={(params) => <TextField {...params} label="Sort By" />}
//                         />
//                         <Box
//                             sx={
//                                 {
//                                     "width": "30px",
//                                     "height": "inherit",
//                                     'alignItems': "center",
//                                     "display": "flex"
//                                 }
//                             }
//                         >
//                             {sortBasis === "Ascending" ?
//                                 <Box onClick={
//                                     (event) => {
//                                         setSortBasis("Descending")
//                                     }
//                                 }
//                                     sx={
//                                         {
//                                             "cursor": "pointer",
//                                             "display": "flex",
//                                             "justifyContent": "center",
//                                             "flex_direction": "column",
//                                             "alignItems": "center"
//                                         }
//                                     }
//                                 >
//                                     <GoSortDesc
//                                         height="100%"
//                                         width="100%"
//                                     />
//                                     <p>Desc</p>
//                                 </Box>
//                                 :
//                                 <Box onClick={
//                                     (event) => {
//                                         setSortBasis("Ascending")
//                                     }
//                                 }
//                                     sx={
//                                         {
//                                             "cursor": "pointer",
//                                             "display": "flex",
//                                             "justifyContent": "center",
//                                             "flex_direction": "column",
//                                             "alignItems": "center"
//                                         }
//                                     }
//                                 >
//                                     <GoSortAsc
//                                         height="100%"
//                                         width="100%"
//                                     />
//                                     <p>Asc</p>
//                                 </Box>
//                             }

//                         </Box>
//                     </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <SliderComponent onSliderValueChange={handleSliderRangeChange}/>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Grid
//                         container
//                         spacing={2}
//                         justify={"space-between"}>
//                         {filteredProducts.map(product => (
//                             <Grid
//                                 item
//                                 xs={12}
//                                 sm={6}
//                                 md={4}
//                                 key={product.id}
//                             >
//                                 <ProductCard
//                                     product={product}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// }



// export default ProductList;

import { Autocomplete, Box, Button, Container, Grid, Slider, TextField, Typography } from '@mui/material';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import ProductCard from "./ProductCard";
import SliderComponent from './SliderComponent';
import axios from "axios";


function ProductList() {
    const [productList, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: null,
        company: null,
        rating: null,
        priceRange: null,
        availability: null
    });
    const [sortOption, setSortOption] = useState(null);
    const [sortBasis, setSortBasis] = useState("Ascending")

    const handleResetButtonClick = () => {
        setFilters({
            category: null,
            company: null,
            rating: null,
            priceRange: null,
            availability: null
        });
        setSortOption(null);
        setSortBasis("Ascending")
    };

    useEffect(() => {
        fetch('https://json-server.bytexl.app/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            });
    }, []);

    const axiosClient = axios.create({baseURL:"/"})

    const handleFilterChange = (name, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSliderRangeChange=(sliderValue)=>{
        setFilters(prevFilters => ({
            ...prevFilters,
            priceRange: sliderValue
        }));
    }

    const applyFilters = () => {
        let filtered = [...productList];


        if (filters.category) {
            filtered = filtered.filter(
                product =>
                    filters.category === "All" ?
                        true : product.category === filters.category
            );
        }

        if (filters.company) {
            filtered = filtered.filter(
                product =>
                    filters.company === "All" ?
                        true : product.company === filters.company
            );
        }

        if (filters.rating) {
            filtered = filtered.filter(
                product =>
                    filters.rating === "All" ?
                        true : product.rating >= filters.rating
            );
        }

        if (filters.priceRange) {
            const [min, max] = filters.priceRange
            filtered = filtered.filter(
                product =>
                    product.price >= min && product.price <= max
            );
        }

        if (filters.availability) {
            filtered = filtered.filter(product =>
                filters.availability === "All" ?
                    true : product.availability === filters.availability
            );
        }

        if (sortOption) {
            filtered.sort((a, b) => {
                if (sortOption === 'price') {
                    return a.price - b.price;
                } else if (sortOption === 'rating') {
                    return b.rating - a.rating;
                } else if (sortOption === 'discount') {
                    return b.discount - a.discount;
                } else if (sortOption === 'name') {
                    return a.productName.localeCompare(b.productName);
                }
                return 0;
            });
            if (sortBasis === "Descending") filtered.reverse()
        }
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [filters, sortOption, sortBasis]);

    const findUniqueElementsList = (value) => {
        let uniqueElements = ["All"];
        productList.forEach((productItem) => {
            if (!uniqueElements.includes(productItem[value])) {
                uniqueElements.push(productItem[value]);
            }
        });
        return uniqueElements;
    };

    const handleAutoCompleteValueChange = (event, newValue, name) => {
        handleFilterChange(name, newValue);
    };

    if (!filteredProducts) return <div>Loading...</div>;

    return (
        <Container>
            <Box
                sx={
                    {
                        "display": "flex",
                        "justifyContent": "space-between",
                        "alignItems": "center",
                        "height": "fit-content"
                    }
                }
            >
                <h1 >All Products</h1>
                <Button
                    variant='outlined'
                    onClick={() => handleResetButtonClick()}
                >
                    Clear Filters
                </Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} padding={"0 28px"}
                    sx={
                        {
                            backgroundColor: "white"
                        }
                    }
                >
                    <Box
                        display={'flex'}
                        justifyContent={"space-between"}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={filters.category}
                            onChange={(event, newValue) => {
                                handleAutoCompleteValueChange(event, newValue, "category");
                            }}
                            options={findUniqueElementsList("category")}
                            sx={{ width: 200 }}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={filters.company}
                            onChange={(event, newValue) => {
                                handleAutoCompleteValueChange(event, newValue, "company");
                            }}
                            options={findUniqueElementsList("company")}
                            sx={{ width: 150 }}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params) => <TextField {...params} label="Company" />}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={filters.rating}
                            onChange={(event, newValue) => {
                                handleAutoCompleteValueChange(event, newValue, "rating");
                            }}
                            options={findUniqueElementsList("rating").map((ele) => `${ele}`)}
                            sx={{ width: 150 }}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params) => <TextField {...params} label="Rating" />}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={filters.availability}
                            onChange={(event, newValue) => {
                                handleAutoCompleteValueChange(event, newValue, "availability");
                            }}
                            options={findUniqueElementsList("availability")}
                            getOptionLabel={(option) => option === "yes" ? "Stock Available" : option === "no" ? "Out of Stock" : "All"}
                            sx={{ width: 150 }}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params) => <TextField {...params} label="Availability" />}
                        />
                        <Autocomplete
                            disablePortal
                            value={sortOption}
                            id="combo-box-demo"
                            onChange={(event, newValue) => {
                                setSortOption(newValue);
                            }}
                            options={
                                [
                                    "name",
                                    "price",
                                    "rating",
                                    "discount"
                                ]
                            }
                            getOptionLabel={(option) => option}
                            sx={{ width: 150 }}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params) => <TextField {...params} label="Sort By" />}
                        />
                        <Box
                            sx={
                                {
                                    "width": "30px",
                                    "height": "inherit",
                                    'alignItems': "center",
                                    "display": "flex"
                                }
                            }
                        >
                            {sortBasis === "Ascending" ?
                                <Box onClick={
                                    (event) => {
                                        setSortBasis("Descending")
                                    }
                                }
                                    sx={
                                        {
                                            "cursor": "pointer",
                                            "display": "flex",
                                            "justifyContent": "center",
                                            "flex_direction": "column",
                                            "alignItems": "center"
                                        }
                                    }
                                >
                                    <GoSortDesc
                                        height="100%"
                                        width="100%"
                                    />
                                    <p>Desc</p>
                                </Box>
                                :
                                <Box onClick={
                                    (event) => {
                                        setSortBasis("Ascending")
                                    }
                                }
                                    sx={
                                        {
                                            "cursor": "pointer",
                                            "display": "flex",
                                            "justifyContent": "center",
                                            "flex_direction": "column",
                                            "alignItems": "center"
                                        }
                                    }
                                >
                                    <GoSortAsc
                                        height="100%"
                                        width="100%"
                                    />
                                    <p>Asc</p>
                                </Box>
                            }

                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <SliderComponent onSliderValueChange={handleSliderRangeChange}/>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={2}
                        justify={"space-between"}>
                        {filteredProducts.map(product => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={product.id}
                            >
                                <ProductCard
                                    product={product}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}



export default ProductList;

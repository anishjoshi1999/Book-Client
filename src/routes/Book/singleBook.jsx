import React, { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";

function singleBook() {

    const [data, setData] = useState([]);
    const urlSlug = useParams()
    const serverURL = import.meta.env.VITE_SERVER_URL
    const baseURL = `${serverURL}/api/books/${urlSlug.slug}`;
    useEffect(() => {
        const fetchData = async () => {
          try {
    
            const response = await fetch(baseURL);
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            setData(jsonData);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      function StarRating({numberofStars}){
        const stars = []
        for(let i = 0; i < numberofStars; i++){
            stars.push(<span key={i}>⭐</span>)
        }
        return <div>Rating: {stars}</div>
      }
      return (
        <div>
            <Link to={"/books"}>Books</Link>
            <div className="bookdetails">
                <div className="col-1">
                    <img src= {`${serverURL}/uploads/${data?.thumbnail}`} alt={data?.title} />
                    <Link to={`/editbook/${data.slug}`}>Edit</Link>
                </div>
                <div className="col-2">
                    <h1>{data?.title}</h1>
                    <p>{data?.description}</p>
                    <StarRating numberofStars={data?.stars}></StarRating>
                    <p>Category</p>
                    <ul>
                        {data?.category?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      )
}


  
export default singleBook
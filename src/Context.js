import React, { createContext, useContext, useState } from 'react'
import useInput from './CustomHooks/useInput';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { v4 as uuidv4 } from "uuid";

const Review = createContext();

const Context = ({children}) => {
    const [reviews,setReviews] = useState({'no':{'0':''},'by':{'0':''}, 'item_name':{'0':''}, 'rating': {'0':''}, 'rating_head': {'0':''}, 'rating_text': {'0':''}});
    const [theArray, setTheArray] = useState([]);
    const [item, bindItem] = useInput('');
    const [size, bindSize] = useInput(0);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refetchInterval, setRefetchInterval] = useState(5000);
    const [isScrapped, setisScrapped] = useState(false);
    
    const [createContractMutation, { data: contract }] = useMutation(
        () => {
          const id = uuidv4();
          return { id };
        },
        {
          onSuccess: () => {
            setRefetchInterval(5000);
          }
        }
    );

    const fakePoll= async(_, id) => {
        const method = await axios.get('https://flipkart-scrapper-api.herokuapp.com/is_scrapped',{
          responseType: "",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
        })
        .then(res=>{
          return res;
        })
        .catch(error=>console.log(error))
      
        console.log(method.data);
      
        let status = (method.data === "False") ? "False" : "True";
        return { id, status };
    }

    const split = async() =>{
        const data = await axios.get('https://flipkart-scrapper-api.herokuapp.com/split',{
          responseType: "",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
        })
        .then(res=>{
          return res;
        })
        .catch(error=>console.log(error));
        return data.data;
    }

    const scrappedData = async() =>{
        const data = await axios.get('https://flipkart-scrapper-api.herokuapp.com/full',{
          responseType: "",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
        })
        .then(res=>{
          return res;
        })
        .catch(error=>console.log(error));
        return data.data;
    }

    const createData = (no, by, itemName, rating, ratingHead, ratingText) => {
        const noid = uuidv4();
        const byid = uuidv4();
        const itemnameid = uuidv4();
        const ratingid = uuidv4();
        const ratingheadid = uuidv4();
        const ratingtextid = uuidv4();
        return {'no':no , 'noid':noid, 'by': by, 'byid':byid, 'item_name': itemName, 'itemnameid': itemnameid, 'rating': rating, 'ratingid':ratingid, 'rating_head':ratingHead, 'ratingheadid':ratingheadid, 'rating_text':ratingText, 'ratingtextid':ratingtextid};
    }

    useUpdateEffect(()=>{
        let newArr = []
            for(let i=0; i<Object.keys(reviews.by).length; i++){
                newArr.push(createData(i+1, reviews.by[i], reviews.item_name[i], reviews.rating[i], reviews.rating_head[i], reviews.rating_text[i]))  
            }
        setTheArray(newArr);
    }, [reviews])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(size);
        console.log(item);
        if(size===0||size===""||item===""){
            setTheArray([])
        } else {
            setSubmitting(true);
            setLoading(true);
            fetchMethod().then((res)=>{
                console.log(res);
                if(res === "split"){ 
                  split().then((res)=>{
                    if(res === "scrapping"){
                      createContractMutation();
                    }
                  })
                }
                else if(res === "full"){
                    setisScrapped(true);
                }
            })
        }
    }

    const fetchMethod = async() => {
        const method = await axios.get('https://flipkart-scrapper-api.herokuapp.com/method',{
          responseType: "",
          headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
          params:{
            "item": `${item}`,
            "size": `${size}`
          }
        })
        .then(res=>{
          return res;
        })
        .catch(error=>console.log(error))
      
        return method.data;
    }

    // eslint-disable-next-line no-unused-vars
    const { data: poll, status } = useQuery(["poll", contract?.id], fakePoll, {
        initialData: { status: "False" },
        refetchInterval: refetchInterval,
        refetchOnWindowFocus: false,
        enabled: contract?.id,
        onSuccess: (data) => {
          if (data.status === "True") {
            setRefetchInterval(-1);
            setisScrapped(true);
          }
        },
    });

    // eslint-disable-next-line no-unused-vars
    const { data: scrappeddata} = useQuery("scrappedData", scrappedData, {
        initialData: { data: [] },
        enabled: isScrapped,
        refetchOnWindowFocus: false,
        retry: true,
        onSuccess: (data)=>{
          setReviews(data);
          setisScrapped(false);
          setLoading(false);
          setSubmitting(false);
        }
    })

    const headers = [
        { label: "No.", key: "no" },
        { label: "By", key: "by" },
        { label: "Item Name", key: "item_name" },
        { label: "Rating", key: "rating" },
        { label: "Rating Head", key: "rating_head" },
        { label: "Comments", key: "rating_text" }
    ];

    return (
        
        <Review.Provider value={{reviews, setReviews, item, bindItem, size, bindSize, theArray, setTheArray, handleSubmit, submitting, setSubmitting, loading, setLoading, headers}}>
            {children}
        </Review.Provider>
        
    )
}

export default Context;
export const ReviewState = () => {
    return useContext(Review);
}
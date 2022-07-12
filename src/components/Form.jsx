import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Form = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios.get("https://lifecycle-44e14-default-rtdb.firebaseio.com/post.json")
      .then(res => {
        const arr = [];
        console.log(res.data);
        for (const key in res.data) {
          arr.push({ ...res.data[key], id: key });
        }
        setLoading(false);
        setItems([...arr]);
      })
  }

  useEffect(() => {
    setLoading(true);
    fetchData()
  }, []);

  const handleInputChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    setLoading(true);
    axios.post("https://lifecycle-44e14-default-rtdb.firebaseio.com/post.json", { data: { name: text, status: false } }).then(res => {
      fetchData();
    });
  }

  const handleDelete = (id) => {
    setLoading(true);
    axios.delete(`https://lifecycle-44e14-default-rtdb.firebaseio.com/post/${id}.json`)
      .then(res => {
        console.log(res);
        fetchData();
      })
  }

  const handleChange = (id, status, el) => {
    setLoading(true);
    axios.patch(`https://lifecycle-44e14-default-rtdb.firebaseio.com/post/${id}.json`, { data: { ...el.data, status: !status } })
      .then(res => {
        console.log(res);
        fetchData();
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={text} type="text" onChange={handleInputChange} />
        <button className="btn">Submit</button>
      </form>
      {loading ? <div>...Loading</div> : (
        <ul>
          {items && items?.map((el, index) => (<li key={el.id}>
            <div>{el.data.name}</div>
            <button onClick={() => { handleChange(el.id, el.data.status, el) }} >{el.data.status ? "true" : "false"}</button>
            <button onClick={() => { handleDelete(el.id) }} >Delete</button>
          </li>))}
        </ul>)}
    </>
  )
}

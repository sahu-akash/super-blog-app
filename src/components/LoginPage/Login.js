import "./Login.css"

function Login( {setappToken} ) {

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();
   
    await postData("https://api.supermetrics.com/assignment/register", {
      client_id: "ju16a6m81mhid5ue1z3v2g0uh",
      email: "aks@gmail.com",
      name: "aks",
    }).then((data) => {
      setappToken(data.data.sl_token)
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label>
            <b>Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            id="Uname"
            required
          />

          <label>
            <b>Email</b>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            name="email"
            required
          />

          <button type="submit">GO</button>
          
        </div>
      </form>
    </div>
  );
}

export default Login;

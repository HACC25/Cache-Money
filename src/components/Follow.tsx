const Follow = () => {
  return (
    <div className="row" style={{ maxWidth: "800px" }}>
      <div className="col-12 col-md-8 col-lg-7">
        <label
          className="form-label"
          style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)" }}
        >
          Email Address
        </label>
        <div className="input-group">
          <input
            type="email"
            className="form-control form-custom-size"
            id="FollowEmail"
            placeholder="name@example.com"
            aria-describedby="email-form"
            style={{ fontSize: "clamp(0.83rem, 1.2vw, 1.5rem)" }}
          />
          <button
            className="btn btn-outline-dark"
            type="button"
            id="email-form"
            style={{ fontSize: "clamp(0.83rem, 1.2vw, 1.5rem)" }}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Follow;

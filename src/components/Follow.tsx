import Button from "./Button";

const Follow = () => {
  return (
    <div className="col">
      <div className="row">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-control"
          id="FollowEmail"
          placeholder="name@example.com"
        />
      </div>
      <div className="row">
        <div className="text-decoration-none d-flex justify-content-end">
          <Button>SEND</Button>
        </div>
      </div>
    </div>
  );
};

export default Follow;

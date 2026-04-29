const CustomFooter = () => {
  return (
    <>
      {/* Footer Section */}
      <footer className="footer inner-footer">
        <div className="container">
          {/* for nav bar */}
          <div className="row py-4">
            <div className="col-12 text-center">
              <p className="mb-0 text-white">
                BRHMC-iHOMIS © {new Date().getFullYear()} All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CustomFooter;
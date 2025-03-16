import React from "react";

const Harvest = () => {
  const [showHarvest, setShowHarvest] = React.useState(true);
  const [showPrune, setShowPrune] = React.useState(false);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <h1 style={{ fontSize: 50, color: "white" }}>Harvest Management</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: "50px",
        }}
      >
        <button
          style={{
            border: "2px solid",
            borderRadius: 10,
            borderColor: showHarvest ? "white" : "transparent",
            padding: 10,
            color: "white",
          }}
          onClick={() => {
            setShowPrune(false);
            setShowHarvest(true);
          }}
        >
          Harvest
        </button>
        <button
          style={{
            border: "2px solid",
            borderRadius: 10,
            borderColor: showPrune ? "white" : "transparent",
            padding: 10,
            color: "white",
          }}
          onClick={() => {
            setShowHarvest(false);
            setShowPrune(true);
          }}
        >
          Prune
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        {showHarvest && (
          <form>
            <div
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 40,
                border: "2px solid",
                borderRadius: 10,
                borderColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "space-between",
                }}
              >
                <h1 style={{ fontSize: 20, color: "white" }}>Block ID</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="text"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "space-between",
                }}
              >
                <h1 style={{ fontSize: 20, color: "white" }}>Harvest Date</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="date"
                  placeholder="Block"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
        {showPrune && (
          <form>
            <div
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 40,
                border: "2px solid",
                borderRadius: 10,
                borderColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "space-between",
                }}
              >
                <h1 style={{ fontSize: 20, color: "white" }}>Block ID</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="text"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "space-between",
                }}
              >
                <h1 style={{ fontSize: 20, color: "white" }}>Prune Date</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="date"
                  placeholder="Block"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Harvest;

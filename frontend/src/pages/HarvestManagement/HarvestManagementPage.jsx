import React from "react";
import UpperPanel from "../../components/UpperPanel";

const Harvest = () => {
  const [showHarvest, setShowHarvest] = React.useState(true);
  const [showPrune, setShowPrune] = React.useState(false);
  return (
    <div className="w-full h-screen text-black">
      <UpperPanel/>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: 50, color: "black" }}>Harvest Management</h1>
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
            borderColor: showHarvest ? "black" : "transparent",
            padding: 10,
            color: "black",
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
            borderColor: showPrune ? "black" : "transparent",
            padding: 10,
            color: "black",
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
                borderColor: "black",
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
                <h1 style={{ fontSize: 20, color: "black" }}>Block ID</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "black",
                    color: "black",
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
                <h1 style={{ fontSize: 20, color: "black" }}>Harvest Date</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "black",
                    color: "black",
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
                    borderColor: "black",
                    color: "black",
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
                borderColor: "black",
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
                <h1 style={{ fontSize: 20, color: "black" }}>Block ID</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "black",
                    color: "black",
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
                <h1 style={{ fontSize: 20, color: "black" }}>Prune Date</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "black",
                    color: "black",
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
                    borderColor: "black",
                    color: "black",
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

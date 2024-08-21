import { useEffect, useState } from 'react';
import './App.css';
import { MyPieChart } from './components/piechart';
import { rawData } from './rawdata';

function App() {
  const [widgetsData, setWidgetsData] = useState([]);
  
  useEffect(() => {
    const storedWidgets = localStorage.getItem("widgets");
    if (storedWidgets) {
      setWidgetsData(JSON.parse(storedWidgets));
    } else {
      localStorage.setItem("widgets", JSON.stringify(rawData));
      setWidgetsData(rawData);
    }
  }, [widgetsData]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Create a FormData object from the form element
    const formData = new FormData(e.target);

    // Extract form values
    const category = formData.get('category');
    const widgetName = formData.get('widgetName');

    // Extract title-value pairs
    const newWidgetValues = [
      { name: formData.get('title1'), value: parseInt(formData.get('value1')) },
      { name: formData.get('title2'), value: parseInt(formData.get('value2')) },
      { name: formData.get('title3'), value: parseInt(formData.get('value3')) }
    ];
    

    // Create a new widget object
    const newWidget = [newWidgetValues, { widgetCategory: category, widgetName: widgetName }];
    console.log(newWidget, "first log")
    // Update state with the new widget
    const storedWidgets= JSON.parse(localStorage.getItem("widgets"))
    localStorage.setItem("widgets", JSON.stringify([...storedWidgets, newWidget]));
    console.log(localStorage.getItem("widgets"));
    setWidgetsData(JSON.stringify([...storedWidgets, newWidget]));
    window.location.reload();



    // Clear form fields after submission
    e.target.reset();


  };

  return (
    <div className="App bg-primary-subtle">
      {/* header starts  */}
      <header className='p-3'>
        <nav className='d-flex justify-content-between'>
          <div className='h2'>
            CNAPP Dashboard
          </div>
          <div>
            <button className="btn btn-light" data-bs-toggle="modal" data-bs-target="#addWidget">
              Add Widget +
            </button>
          </div>
        </nav>
      </header>
      {/* header ends  */}

      {/* Widgets start here */}
      <div className="cspm-dashboard p-4">
        <h3>CSPM Executive Dashboard</h3>
        <div className="row">
          {widgetsData.map((widget, index) => (
            <div className="col-lg-4" key={index}>
              <div className="card position-relative">
                <div className="card-title position-absolute top-0 start-0 p-3">
                  <h5 className='pt-2 ps-2 text-dark'>{widget[1].widgetName} </h5>
                </div>
                <MyPieChart data={widget} />
              </div>
            </div>
          ))}
          <div className="col-lg-4">
            <div className="card d-flex justify-content-center align-items-center">
              <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addWidget">
                Add Widget +
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Widgets end here */}

      {/* Modal */}
      <div
        className="modal fade"
        id="addWidget"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Widget
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <select className="form-select" name="category" aria-label="Default select example" required>
                    <option value="" disabled>Select Category</option>
                    <option value="cspm">CSPM</option>
                    <option value="cwpp">CWPP</option>
                    <option value="registry">Registry</option>
                  </select>
                </div>
                <div className="mb-3 form-floating">
                  <input className='form-control' type="text" placeholder='' name="widgetName" />
                  <label htmlFor="widgetName">Widget Name</label>
                </div>
                <div className="input-group">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="title1" />
                    <label>Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="number" className="form-control mb-3" name="value1" />
                    <label>Value</label>
                  </div>
                </div>
                <div className="input-group">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="title2" />
                    <label>Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="number" className="form-control mb-3" name="value2" />
                    <label>Value</label>
                  </div>
                </div>
                <div className="input-group">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="title3" />
                    <label>Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="number" className="form-control mb-3" name="value3" />
                    <label>Value</label>
                  </div>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Add Widget +
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
      {/* Modal ends here */}
    </div>
  );
}

export default App;

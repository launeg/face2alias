import React from 'react';
import FormField from '@cloudscape-design/components/form-field';
import FileUpload from '@cloudscape-design/components/file-upload';
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Button from "@cloudscape-design/components/button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ImageBox from "./ImageBox"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Modal from "react-modal";
// @cloudscape-design/components/modal
import Input from "@cloudscape-design/components/input";
import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400.css"; // Specify weight
import ErrorBar from './errorBar';
import SuccessBar from './successBar';


<link rel="stylesheet" href="styles.css"></link>
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'rgba(25,37,52,0.75)'
}

const carousel = {
  alignItems: 'center',
  justifyContent: 'center',
  width: '650px',
  padding: '20px',
  backgroundColor: 'rgba(25,37,52,0.75)',
  border: 'solid 2px',
  borderColor: 'rgba(25,37,52,1)',
}

const alertStyle = {
  zIndex: '999999'
}

const imageButton = {
  marginTop: "5%"
}

const headerStyle = {
  fontFamily:'Open Sans',
  fontSize:'18px',
  fontWeight: '700',
  paddingLeft:'35%',
  padding: '30px 0',
  textAlign: 'center'
}

const signUpButton = {
  width:'100%',
  textAlign:'center',
  paddingLeft: '0%',
  paddingTop:'5%',
  paddingBottom: '0%',
  fontSize: '12px',
  
}

const modalStyle = {
  overlay: {
    backgroundColor:'rgba(25,37,52,0.75)',
  },
  content: {
    borderRadius:'20px',
    width:'30%',
    height:'50%',
    position: 'absolute',
    left: '35%',
    top: '30%',
    // overflow: 'auto'
  }
}

const signStyle = {
  overlay: {
    backgroundColor:'rgba(25,37,52,0.75)',
  },
  content: {
    borderRadius:'20px',
    width:'30%',
    height:'65%',
    position: 'relative',
    left: '35%',
    top: '30%',
    overflow: 'hidden'
  }
}

const submitButton = {
  width:'100%',
  textAlign:'center',
  paddingLeft: '0%',
  paddingTop:'10%',
  paddingBottom: '0%',
}

const navBar = {
  position: 'sticky',
  zIndex: '999999'
}

const uploadBoxStyle = {
  width: '400px',
  height: '200px',
  border: '2px dashed #ddd',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  margin: 'auto',
  padding: 'auto',
  textAlign: 'center',
  backgroundColor: 'white',
  marginTop: '20px' 
}
const inputBoxStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}

function Home() {
  // Photo upload 
  const [value, setValue] = React.useState([]);
  // Disable image submit button
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  // Image and boxes arrays
  const [previousUploads, setPreviousUploads] =React.useState([]);
  const [boxesOfBoxes, setBB] = React.useState([]);
  const [widths, setWidths] = React.useState([]);
  const [heights, setHeights] = React.useState([]);
  const [colorsAll, setColorsAll] = React.useState([]);
  const [aliasesAll, setAliasesAll] = React.useState([]);
  const [latest, setLatest] = React.useState(-1);

  //Login Modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [aliasValue, setAliasValue] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  // Logged in user
  const [user, setUser] = React.useState("");

  //Sign Up Modal
  const [isSign, setIsSign] = React.useState(false);
  const [aliasNew, setAliasNew] = React.useState("");
  const [phonetool, setPhonetool] = React.useState([]);
  const [alertSign, setAlertSign] = React.useState(false);
  const [successSign, setSuccessSign] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  React.useLayoutEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("reactStates"));
    if (data !== null) {
      setIsButtonDisabled(data['isButtonDisabled']);
      setPreviousUploads(data['previousUploads']);
      setBB(data['boxesOfBoxes']);
      setWidths(data['widths']);
      setHeights(data['heights']);
      setColorsAll(data['colorsAll']);
      setAliasesAll(data['aliasesAll']);
      setLatest(data['latest']);
      setIsModalOpen(false);
      setUser(data['user']);
      setIsSign(false);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  async function submitLogin() {
    try {
      let alias = aliasValue.toString();
      let url = "https://jbk08mzwr9.execute-api.us-west-2.amazonaws.com/v1/" // the API for face2alias_login
      let res = await fetch(url, {
          // at first we were using ANY in the api, therefore it would give us Missing Authentication Token error, and it took us a while to understand this was the error 
        body: alias
      });
      if (res.status === 200) {
        setSuccess(true);
        setUser(aliasValue);
        setTimeout(() => {
          setSuccess(false);
          setIsModalOpen(false);
          setIsSign(false);
        }, 2000);
        
      } else {
        console.log(res);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      }
      setAliasValue("");
    } catch (error) {
      console.log("error");
    }
  };


  function face2aliasSubmit() {
    if (value === null || value.length === 0) {
      console.log("Error: no file specified")
    }
    else {
      let file = new File(value, "image.jpeg");
      console.log(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      setIsButtonDisabled(true);
      reader.onload = async function() {
        try {
          let image_base64 = reader.result;
          let body = image_base64.substring(37);
          console.log(image_base64)
          let url = "https://oi10c481f0.execute-api.us-west-2.amazonaws.com/v1/"
          let res = await fetch(url, {
            method: 'POST',
            body: body
          });
          const data = await res.json();
          bound_boxes(image_base64, data);
          setIsButtonDisabled(false);
          setValue([]);
        } catch (error) {
          console.log("error");
        }

      }

    }

  }

  function bound_boxes(image, data) {
    let getDimensions = new Promise(function(resolve, reject) {
      let img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;

        if (w === undefined || h === undefined) {
          reject("ERROR");  // when error
        } else {
          resolve([w, h]); // when successful
        }
      }
      img.src = image;
    });

    getDimensions.then(
      function(da) {
        let wid = da[0];
        let hei = da[1];

        let ratio = 400 / hei;
        hei *= ratio;
        wid *= ratio;

        let boxes = [];
        let aliases_list = data['aliases'];
        let boxes_list = data['boxes'];

        if (aliases_list === undefined) {
          return;
        }

        let num_detected = aliases_list.length;
        let cols = [];
        console.log(aliases_list)

        for (let i = 0; i < num_detected; i++) {
          if (aliases_list[i] === "") {
            cols.push("#FF0000");
            aliases_list[i] = "na";
          } else {
            cols.push("#39FF14");
            let temp = aliases_list[i];
            aliases_list[i] = " " + temp + " ";
          }
          // how to get the name
          boxes.push({x: boxes_list[i]['Left'] * wid, y: boxes_list[i]['Top'] * hei, width: boxes_list[i]['Width'] * wid, height: boxes_list[i]['Height'] * hei})
        }
        let temp1 = boxesOfBoxes;
        temp1.push(boxes);
        setBB(temp1);
        let temp2 = widths;
        temp2.push(wid);
        setWidths(temp2);
        let temp3 = heights;
        temp3.push(hei);
        setHeights(temp3);
        let temp4 = colorsAll;
        temp4.push(cols);
        setColorsAll(temp4);
        let temp5 = aliasesAll;
        temp5.push(aliases_list);
        setAliasesAll(temp5);
        let temp6 = previousUploads;
        temp6.push(image);
        setPreviousUploads(temp6);
        let last = latest;
        last += 1;
        setLatest(last);

        let reactStates = {
          "isButtonDisabled": isButtonDisabled,
          "previousUploads": previousUploads,
          "boxesOfBoxes": boxesOfBoxes,
          "widths": widths,
          "heights": heights,
          "colorsAll": colorsAll,
          "aliasesAll": aliasesAll,
          "latest": latest + 1,
          "user": user
        }
        sessionStorage.setItem("reactStates", JSON.stringify(reactStates));
      },
      function(error) {
        console.log(error);
      }
    );
  }

  function toggleSignUp() {
    setAliasNew("");
    setPhonetool([]);
    setAliasValue("");
    setIsModalOpen(!isModalOpen);
    setIsSign(!isSign);
  }

  async function handleSignUp() {
    try {
      let url = "https://pvhh2t3sgb.execute-api.us-west-2.amazonaws.com/v1/" // the API for face2alias_signup
      let file = new File(phonetool, "phonetool.jpeg");
      console.log(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let alias = aliasNew.toString();
      reader.onload = async function() {
        let image_base64 = reader.result;
        let img = image_base64.substring(37);
        let body = {
          "alias": alias,
          "image": img
        }
        let body_json = JSON.stringify(body);
        let res = await fetch(url, {
          method: 'POST', 
          body: body_json
        });
        let data = await res.json();
        console.log(data);
        if (res.status === 200) {
          setSuccessSign(true);
          setUser(aliasNew);
          setAlertMessage(data);
          setTimeout(() => {
            setSuccessSign(false);
            setAlertMessage("")
            setIsSign(false);
          }, 2000);   
        } else {
          setAlertSign(true);
          setAlertMessage(data);
          setTimeout(() => {
            setAlertSign(false);
            setAlertMessage("");
            setPhonetool([]);
          }, 4500);
        }
        setAliasNew("");
      }
    } catch (error) {
      console.log("error");
    }
  }

  function logout_function(e) {
    sessionStorage.clear();
    console.log(e);
    setIsButtonDisabled(false);
    setPreviousUploads([]);
    setBB([]);
    setWidths([]);
    setHeights([]);
    setColorsAll([]);
    setAliasesAll([]);
    setLatest(-1);
    setIsModalOpen(true);
    setUser("");
    setIsSign(false);
    window.location.reload();
  }

  const SubmitButton = () => (
    <div style={imageButton} >
          <Button onClick={face2aliasSubmit} variant="primary" disabled={isButtonDisabled} >Submit</Button>
    </div>
  );

    return (
            <div>
                <div>
                <Modal 
                  style={modalStyle}
                  isOpen={isModalOpen}
                  ariaHideApp={false}
                  >

                    {alert && (
                      <div style={alertStyle}>
                        <ErrorBar header="Alias not in system" content="Retry login or sign up below."/>
                      </div> 
                    )}

                    {success && (
                      <div style={alertStyle}>
                        <SuccessBar header="Successfully logged in" content={`Welcome ${user}!`}/>
                    </div>
                    )}
                    {/* bold h3, and find a new frindly font */}
                    <h3 style={headerStyle}>Login to Face2Alias</h3> 
                    <FormField>
                      <div style={inputBoxStyle}>
                        <Input
                          id="message"
                          name="message" ///...............................
                          placeholder='Alias'
                          value={aliasValue}
                          autoComplete="off" //to not show the previous inputs
                          onChange={event =>
                          setAliasValue(event.detail.value)}
                          
                        />
                      </div>
                      <div style={submitButton}>
                        <Button style={submitButton} type="submit" variant="primary" onClick={submitLogin}>Log In</Button>
                      </div>
                      <div style={signUpButton}>
                        {/* bod the p */}
                        <p>Don't have an account?</p> 
                        <Button style={signUpButton} onClick={toggleSignUp}>Sign Up</Button>
                      </div>
                    </FormField>
                  </Modal>
                </div>

              {/* Sign Up */}
              
                <div>
                  <Modal 
                  style={signStyle}
                  isOpen={isSign}
                  ariaHideApp={false}
                  >

                    {alertSign && (
                      <div style={alertStyle}>
                        <ErrorBar header="Invalid sign up" content={`${alertMessage}`} />
                      </div> 
                    )}

                    {successSign && (
                      <div style={alertStyle}>
                        <SuccessBar header="Successfully signed up" content={`Welcome ${user}`}/>
                    </div>
                    )}

                    <h3 style={headerStyle}>Sign Up for Face2Alias</h3>
                    <FormField>
                      <div style={inputBoxStyle}>
                        <Input
                          id="message"
                          name="message" ///...............................
                          placeholder='Alias'
                          value={aliasNew}
                          autoComplete="off" //to not show the previous inputs
                          onChange={event =>
                            setAliasNew(event.detail.value)}
                        />
                        <br/>
                        <FileUpload
                          style= {imageButton}
                          onChange={({ detail }) => setPhonetool(detail.value)}
                          value={phonetool}
                          i18nStrings={{
                            uploadButtonText: e =>
                              e ? "Choose files" : "Choose file",
                            dropzoneText: e =>
                              e
                                ? "Drop files to upload"
                                : "Drop file to upload",
                            removeFileAriaLabel: e =>
                              `Remove file ${e + 1}`,
                            limitShowFewer: "Show fewer files",
                            limitShowMore: "Show more files",
                            errorIconAriaLabel: "Error"
                          }}
                          showFileLastModified
                          showFileSize
                          showFileThumbnail
                          tokenLimit={1}
                          constraintText="Upload jpeg phonetool"
                        />

                      </div>
                      <div style={submitButton}>
                        <Button style={submitButton} onClick={handleSignUp}>Sign Up</Button>
                      </div>
                      <div style={signUpButton}>
                        <p>Already have an account?</p>
                        <Button style={signUpButton} type="submit" onClick={toggleSignUp}>Log In</Button>
                      </div>
                      
                    </FormField>
                  </Modal>
                </div>
              

              
              <div style={navBar}>
              {/* TopNavigation */}
              <TopNavigation
              identity={{
                href: "#",
                title: "Face2Alias",
              }}
              utilities={[
                {
                  type: "menu-dropdown",
                  text: user, 
                  description: user + "@amazon.com",
                  onItemClick: (event) => {
                    if (event.detail.id === "signout") {
                      logout_function();
                    }
                  },
                  iconName: "user-profile",
                  items: [
                    { id: "profile", text: "Profile" },
                    {
                      id: "support-group",
                      text: "Support",
                      items: [
                        {
                          id: "documentation",
                          text: "Documentation",
                          href: "#",
                          external: true,
                          externalIconAriaLabel:
                            " (opens in new tab)"
                        },
                        { id: "support", text: "Support" },
                        {
                          id: "feedback",
                          text: "Feedback",
                          href: "#",
                          external: true,
                          externalIconAriaLabel:
                            " (opens in new tab)"
                        }
                      ]
                    },
                    { id: "signout", text: "Sign out"}
                  ]
                }
              ]}
              />
              </div>

              {/* FileUpload */}
              <div  style={containerStyle}>
                <div className="center" >
                {previousUploads.length > 0 && (
                  <div style={carousel}>
                      <Carousel showThumbs={false} emulateTouch selectedItem={latest} autoFocus>
                        {previousUploads.map((upload, index) => (
                            <ImageBox image_base64={upload} boxesCoordinates={boxesOfBoxes[index]} width={widths[index]} height={heights[index]} color={colorsAll[index]} aliases={aliasesAll[index]}/>
                        ))}
                    </Carousel>
                  </div>
                )}

                <div className="div2" style={uploadBoxStyle}>
                  <FormField
                  label="Upload your image"
                  >
                    <FileUpload
                      onChange={({ detail }) => setValue(detail.value)}
                      value={value}
                      i18nStrings={{
                        uploadButtonText: e =>
                          e ? "Choose files" : "Choose file",
                        dropzoneText: e =>
                          e
                            ? "Drop files to upload"
                            : "Drop file to upload",
                        removeFileAriaLabel: e =>
                          `Remove file ${e + 1}`,
                        limitShowFewer: "Show fewer files",
                        limitShowMore: "Show more files",
                        errorIconAriaLabel: "Error"
                      }}
                      showFileLastModified
                      showFileSize
                      showFileThumbnail
                      tokenLimit={1}
                    />
                  </FormField>
                  <SubmitButton />

                </div>
                </div>
              </div>
            </div>

    );
}

export default Home;


// loading, plus two notifications, sign out


// Stuff to fix:
// it shows the ubmit box if is not full screen 
//  in the documentation add the documentation 

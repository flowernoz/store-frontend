import { useState } from "react";
import "./Register.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import singUp from "../../assets/signup-image.jpeg";
import { useSignUpMutation } from "../../redux/userApi";
import { toast } from "react-toastify";

export const Register = () => {
  const [signUp] = useSignUpMutation();
  const [clickEye, setClickEye] = useState(false);
  const userRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.year = parseInt(data.year);

    try {
      const res = await signUp(data);
      if (res?.data?.status === "success") {
        toast.success("Mahsulot bazaga qo'shildi !", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
        });
        e.target.reset();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <div className="register_container">
        <div className="register_form_container">
          <div className="register_header">
            <h1>Ro'yxatdan o'tish</h1>
          </div>
          <form onSubmit={userRegister}>
            <div className="form_input_container">
              <div className="input_box">
                <label>Ism</label>
                <input required name="firstname" type="text" />
              </div>
              <div className="input_box">
                <label>Familiya</label>
                <input required name="lastname" type="text" />
              </div>
              <div className="input_box">
                <label>Yil</label>
                <input required name="year" type="text" />
              </div>
              <div className="input_box">
                <label>Jins</label>
                <div className="input_gender_box">
                  <div className="input_gender_item">
                    <label>Erkak</label>
                    <input required value="Erkak" name="gender" type="radio" />
                  </div>
                  <div className="input_gender_item">
                    <label>Ayol</label>
                    <input required value="Ayol" name="gender" type="radio" />
                  </div>
                </div>
              </div>
              <div className="input_box">
                <label>Foydalanuvchi nomi</label>
                <input required name="username" type="text" />
              </div>
              <div className="input_box">
                <label>Kod</label>
                <div className="input_password_box">
                  <input
                    required
                    className="border_none"
                    name="password"
                    type={clickEye ? "text" : "password"}
                  />
                  <span
                    onClick={() => setClickEye(!clickEye)}
                    className="input_eye_button"
                  >
                    {clickEye ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>
                </div>
              </div>
              <div className="input_box">
                <label>Nomer</label>
                <input required name="phone" type="text" />
              </div>
              <div className="input_box">
                <label>Adres</label>
                <input required name="address" type="text" />
              </div>
              <div className="input_box">
                <label>Ro'li</label>
                <select required name="role">
                  <option value=""></option>
                  <option value="Admin">Admin</option>
                  <option value="Owner">Egasi</option>
                </select>
              </div>
            </div>

            <button className="form_button">Qo'shish</button>
          </form>
        </div>
        <div className="register_img_container">
          <img src={singUp} alt="" />
        </div>
      </div>
    </div>
  );
};

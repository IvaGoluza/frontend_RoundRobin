import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Naziv oglasa je obavezan")
    .matches(/^[a-zA-ZčćžšđČĆŽŠĐ\s]+$/, "Naziv oglasa mora sadržavati samo slova, brojeve i razmake"),

  teams: Yup.string()
    .required("Imena natjecatelja su obavezna")
    .matches(/^(?:\w+(?:[;\n]\s*|$)){4,8}$/, "4 do 8 natjecatelja odvojenih ; ili novim redom"),

  scoreSystem: Yup.string()
    .required("Sustav bodovanja je obavezan")
    .matches(/^\d+\/\d+\/\d+$/, "Format: pobjeda/remi/poraz"),
});

export default ValidationSchema;

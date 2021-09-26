import Control from './control'
// import { result } from './example_result/example_result'
// import { result_colored } from './example_result/example_result_colored'
import { result } from "./example_result/example_result_shades";

// Control.show("regis")

// // temp bypass to result
let testdata = {
    name: "test ton ทดสอบ",
    testType: "blackwhite",
    eye: "both",
    birthdate: "1996-08-20"
}
Control.show("result", [result, testdata])


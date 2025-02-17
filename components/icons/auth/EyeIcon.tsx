import React from 'react';

interface EyeIconProps {
  showPassword: boolean;
  isFocused: boolean;
}

const EyeIcon: React.FC<EyeIconProps> = ({ showPassword, isFocused }) => {
  if (showPassword) {
    return isFocused ? (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 16C13.25 16 14.3127 15.5627 15.188 14.688C16.0633 13.8133 16.5007 12.7507 16.5 11.5C16.4993 10.2493 16.062 9.187 15.188 8.313C14.314 7.439 13.2513 7.00133 12 7C10.7487 6.99867 9.68633 7.43633 8.813 8.313C7.93967 9.18967 7.502 10.252 7.5 11.5C7.498 12.748 7.93567 13.8107 8.813 14.688C9.69033 15.5653 10.7527 16.0027 12 16ZM12 14.2C11.25 14.2 10.6127 13.9373 10.088 13.412C9.56333 12.8867 9.30067 12.2493 9.3 11.5C9.29933 10.7507 9.562 10.1133 10.088 9.588C10.614 9.06267 11.2513 8.8 12 8.8C12.7487 8.8 13.3863 9.06267 13.913 9.588C14.4397 10.1133 14.702 10.7507 14.7 11.5C14.698 12.2493 14.4357 12.887 13.913 13.413C13.3903 13.939 12.7527 14.2013 12 14.2ZM12 19C9.56667 19 7.35 18.321 5.35 16.963C3.35 15.605 1.9 13.784 1 11.5C1.9 9.21667 3.35 7.396 5.35 6.038C7.35 4.68 9.56667 4.00067 12 4C14.4333 3.99933 16.65 4.67867 18.65 6.038C20.65 7.39733 22.1 9.218 23 11.5C22.1 13.7833 20.65 15.6043 18.65 16.963C16.65 18.3217 14.4333 19.0007 12 19Z"
          fill="#1C1616"
        />
      </svg>
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 16C13.25 16 14.3127 15.5627 15.188 14.688C16.0633 13.8133 16.5007 12.7507 16.5 11.5C16.4993 10.2493 16.062 9.187 15.188 8.313C14.314 7.439 13.2513 7.00133 12 7C10.7487 6.99867 9.68633 7.43633 8.813 8.313C7.93967 9.18967 7.502 10.252 7.5 11.5C7.498 12.748 7.93567 13.8107 8.813 14.688C9.69033 15.5653 10.7527 16.0027 12 16ZM12 14.2C11.25 14.2 10.6127 13.9373 10.088 13.412C9.56333 12.8867 9.30067 12.2493 9.3 11.5C9.29933 10.7507 9.562 10.1133 10.088 9.588C10.614 9.06267 11.2513 8.8 12 8.8C12.7487 8.8 13.3863 9.06267 13.913 9.588C14.4397 10.1133 14.702 10.7507 14.7 11.5C14.698 12.2493 14.4357 12.887 13.913 13.413C13.39 13.939 12.7527 14.2013 12 14.2ZM12 19C9.56667 19 7.35 18.321 5.35 16.963C3.35 15.605 1.9 13.784 1 11.5C1.9 9.21667 3.35 7.396 5.35 6.038C7.35 4.68 9.56667 4.00067 12 4C14.4333 3.99933 16.65 4.67867 18.65 6.038C20.65 7.39733 22.1 9.218 23 11.5C22.1 13.7833 20.65 15.6043 18.65 16.963C16.65 18.3217 14.4333 19.0007 12 19Z"
          fill="#C0C0C0"
        />
      </svg>
    );
  } else {
    return isFocused ? (
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.3696 17.7857L13.8296 14.2587C13.2342 14.532 12.6142 14.724 11.9696 14.8347C11.3249 14.9453 10.6682 15.0007 9.99956 15.0007C8.02223 15.0007 6.20823 14.4807 4.55756 13.4407C2.9069 12.4007 1.5819 11.032 0.582562 9.33467C0.499229 9.198 0.439896 9.06001 0.404562 8.92067C0.369229 8.78134 0.351562 8.64134 0.351562 8.50067C0.351562 8.36001 0.372229 8.21667 0.413563 8.07067C0.454896 7.92467 0.517563 7.78967 0.601562 7.66567C1.03223 6.99034 1.4879 6.34101 1.96856 5.71767C2.44923 5.09501 3.00956 4.54834 3.64956 4.07767L1.20956 1.63167C1.11623 1.53834 1.06623 1.42434 1.05956 1.28967C1.0529 1.15634 1.1049 1.03434 1.21556 0.923672C1.32156 0.817005 1.43923 0.763672 1.56856 0.763672C1.6979 0.763672 1.8159 0.817005 1.92256 0.923672L18.0766 17.0777C18.1699 17.171 18.2209 17.2847 18.2296 17.4187C18.2382 17.5527 18.1872 17.6747 18.0766 17.7847C17.9699 17.8913 17.8519 17.9447 17.7226 17.9447C17.5932 17.9447 17.4752 17.8913 17.3686 17.7847M9.99956 12.1547C10.2596 12.1547 10.5082 12.1367 10.7456 12.1007C10.9829 12.0647 11.2106 11.9833 11.4286 11.8567L6.64356 7.07067C6.52956 7.28867 6.45123 7.51634 6.40856 7.75367C6.3659 7.99101 6.3449 8.23967 6.34556 8.49967C6.34556 9.519 6.6999 10.3827 7.40856 11.0907C8.11723 11.7987 8.9809 12.1533 9.99956 12.1547ZM9.99956 2.00067C11.9896 2.00067 13.8176 2.52167 15.4836 3.56367C17.1496 4.60567 18.4752 5.98801 19.4606 7.71067C19.5312 7.83067 19.5876 7.95734 19.6296 8.09067C19.6716 8.22401 19.6922 8.36067 19.6916 8.50067C19.6909 8.64067 19.6709 8.77734 19.6316 8.91067C19.5922 9.044 19.5372 9.17067 19.4666 9.29067C19.1759 9.83067 18.8506 10.3373 18.4906 10.8107C18.1312 11.284 17.7292 11.73 17.2846 12.1487C17.1026 12.3307 16.8852 12.4133 16.6326 12.3967C16.3792 12.38 16.1619 12.2807 15.9806 12.0987L13.7876 9.92567C13.6969 9.83501 13.6349 9.73267 13.6016 9.61867C13.5682 9.50467 13.5636 9.38401 13.5876 9.25667C13.6162 9.13 13.6342 9.005 13.6416 8.88167C13.6489 8.75834 13.6529 8.63134 13.6536 8.50067C13.6536 7.48134 13.2992 6.61767 12.5906 5.90967C11.8819 5.20167 11.0182 4.84734 9.99956 4.84667C9.8689 4.84667 9.74523 4.85367 9.62856 4.86767C9.5119 4.88167 9.39656 4.90301 9.28256 4.93167C9.15456 4.96901 9.02623 4.971 8.89756 4.93767C8.76956 4.90434 8.6599 4.84201 8.56856 4.75067L7.53256 3.71467C7.27923 3.46134 7.19423 3.165 7.27756 2.82567C7.36023 2.48567 7.5779 2.27034 7.93056 2.17967C8.27056 2.10901 8.61123 2.06167 8.95256 2.03767C9.2939 2.01367 9.6429 2.00134 9.99956 2.00067ZM11.8976 6.57367C12.1196 6.80301 12.2996 7.06634 12.4376 7.36367C12.5756 7.66101 12.6609 7.97034 12.6936 8.29167C12.7102 8.39901 12.6699 8.47434 12.5726 8.51767C12.4752 8.56167 12.3829 8.54 12.2956 8.45267L10.0536 6.22967C9.96623 6.14234 9.94523 6.05 9.99056 5.95267C10.0366 5.85534 10.1132 5.80667 10.2206 5.80667C10.5506 5.82667 10.8552 5.90134 11.1346 6.03067C11.4139 6.15934 11.6682 6.34034 11.8976 6.57367Z"
          fill="#1C1616"
        />
      </svg>
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.3696 20.7857L15.8296 17.2587C15.2342 17.532 14.6142 17.724 13.9696 17.8347C13.3249 17.9453 12.6682 18.0007 11.9996 18.0007C10.0222 18.0007 8.20823 17.4807 6.55756 16.4407C4.9069 15.4007 3.5819 14.032 2.58256 12.3347C2.49923 12.198 2.4399 12.06 2.40456 11.9207C2.36923 11.7813 2.35156 11.6413 2.35156 11.5007C2.35156 11.36 2.37223 11.2167 2.41356 11.0707C2.4549 10.9247 2.51756 10.7897 2.60156 10.6657C3.03223 9.99034 3.4879 9.34101 3.96856 8.71767C4.44923 8.09501 5.00956 7.54834 5.64956 7.07767L3.20956 4.63167C3.11623 4.53834 3.06623 4.42434 3.05956 4.28967C3.0529 4.15634 3.1049 4.03434 3.21556 3.92367C3.32156 3.81701 3.43923 3.76367 3.56856 3.76367C3.6979 3.76367 3.8159 3.81701 3.92256 3.92367L20.0766 20.0777C20.1699 20.171 20.2209 20.2847 20.2296 20.4187C20.2382 20.5527 20.1872 20.6747 20.0766 20.7847C19.9699 20.8913 19.8519 20.9447 19.7226 20.9447C19.5932 20.9447 19.4752 20.8913 19.3686 20.7847M11.9996 15.1547C12.2596 15.1547 12.5082 15.1367 12.7456 15.1007C12.9829 15.0647 13.2106 14.9833 13.4286 14.8567L8.64356 10.0707C8.52956 10.2887 8.45123 10.5163 8.40856 10.7537C8.3659 10.991 8.3449 11.2397 8.34556 11.4997C8.34556 12.519 8.6999 13.3827 9.40856 14.0907C10.1172 14.7987 10.9809 15.1533 11.9996 15.1547ZM11.9996 5.00067C13.9896 5.00067 15.8176 5.52167 17.4836 6.56367C19.1496 7.60567 20.4752 8.98801 21.4606 10.7107C21.5312 10.8307 21.5876 10.9573 21.6296 11.0907C21.6716 11.224 21.6922 11.3607 21.6916 11.5007C21.6909 11.6407 21.6709 11.7773 21.6316 11.9107C21.5922 12.044 21.5372 12.1707 21.4666 12.2907C21.1759 12.8307 20.8506 13.3373 20.4906 13.8107C20.1312 14.284 19.7292 14.73 19.2846 15.1487C19.1026 15.3307 18.8852 15.4133 18.6326 15.3967C18.3792 15.38 18.1619 15.2807 17.9806 15.0987L15.7876 12.9257C15.6969 12.835 15.6349 12.7327 15.6016 12.6187C15.5682 12.5047 15.5636 12.384 15.5876 12.2567C15.6162 12.13 15.6342 12.005 15.6416 11.8817C15.6489 11.7583 15.6529 11.6313 15.6536 11.5007C15.6536 10.4813 15.2992 9.61767 14.5906 8.90967C13.8819 8.20167 13.0182 7.84734 11.9996 7.84667C11.8689 7.84667 11.7452 7.85367 11.6286 7.86767C11.5119 7.88167 11.3966 7.90301 11.2826 7.93167C11.1546 7.96901 11.0262 7.971 10.8976 7.93767C10.7696 7.90434 10.6599 7.84201 10.5686 7.75067L9.53256 6.71467C9.27923 6.46134 9.19423 6.165 9.27756 5.82567C9.36023 5.48567 9.5779 5.27034 9.93056 5.17967C10.2706 5.10901 10.6112 5.06167 10.9526 5.03767C11.2939 5.01367 11.6429 5.00134 11.9996 5.00067ZM13.8976 9.57367C14.1196 9.80301 14.2996 10.0663 14.4376 10.3637C14.5756 10.661 14.6609 10.9703 14.6936 11.2917C14.7102 11.399 14.6699 11.4743 14.5726 11.5177C14.4752 11.5617 14.3829 11.54 14.2956 11.4527L12.0536 9.22967C11.9662 9.14234 11.9452 9.05 11.9906 8.95267C12.0366 8.85534 12.1132 8.80667 12.2206 8.80667C12.5506 8.82667 12.8552 8.90134 13.1346 9.03067C13.4139 9.15934 13.6682 9.34034 13.8976 9.57367Z"
          fill="#C0C0C0"
        />
      </svg>
    );
  }
};

export default EyeIcon;

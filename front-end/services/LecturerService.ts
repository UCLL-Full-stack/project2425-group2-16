const getAllLecturers = async () => {
  const apiiNameUrl = process.env.NEXT_PUBLIC_API_URL + '/lecturers'
  return fetch(apiiNameUrl, {
    method: "GET",
    headers: { 
      "content-type": "application/json"
    }
  })
};


const getLecturerById = async (id: string) => {
  const apiNameUrl = `${process.env.NEXT_PUBLIC_API_URL}/lecturers/${id}`;
  return fetch(apiNameUrl, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json"
    }
  });
};


const LecturerService = {
  getAllLecturers,
  getLecturerById
};

export default LecturerService;

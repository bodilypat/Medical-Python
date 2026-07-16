# backend/app/schemas/doctor.py

from pydantic import BaseModel
from typing import Optiona, List 

class DoctorBase(BaseModel)
	name: str
	specialization: str
	phone: str 

class DoctorCreate(DoctorBase)
	available_day: List[str] 
	
class DoctorOut(DoctorBase)
	id: str
	available_days: List[str]
	
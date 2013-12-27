create table Employee(
EmpNo int,
Employee varchar(30),
Salary int,
DeptNo int);

select * from employee

delete from Employee
where EmpNo = 4; 

insert into Employee values(8, 'H', NULL,NULL);

update employee
set salary = NULL where Employee = 'H'

select DeptNo, EmpNo,  max(salary)
from Employee
group by DeptNo  

select * from employee

select DeptNo, sum(salary)
from employee
where DeptNo is not NULL
group by DeptNo
having count(*) >= 1
order by DeptNo

select employee, salary + 5000 as New_Salary
from Employee
where New_Salary >= 5000


select * from student
select course, sum(subject_1), avg(subject_2)
from student
group by course

select course,city, max(subject_1), avg(subject_2)
from student
group by course, city
having count(*) > 3
order by course


select ceil(2)

select round(1.236);
select round(1.236,2);
select round(13455,NULL)


select floor(5.232);
select floor(1);
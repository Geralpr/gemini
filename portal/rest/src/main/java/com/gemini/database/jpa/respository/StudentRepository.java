package com.gemini.database.jpa.respository;

import com.gemini.database.jpa.entities.StudentEntity;
import org.springframework.data.repository.CrudRepository;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/20/18
 * Time: 10:19 PM
 */
public interface StudentRepository extends CrudRepository<StudentEntity, Long> {

    StudentEntity findBySisStudentId(Long sisStudentId);
}
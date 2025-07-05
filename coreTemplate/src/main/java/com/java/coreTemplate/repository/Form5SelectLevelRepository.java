package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Form5SelectLevel;

import java.util.List;
import java.util.Optional;

public interface Form5SelectLevelRepository extends JpaRepository<Form5SelectLevel, Long> {

    // Find by exact level name (case-sensitive)
    Optional<Form5SelectLevel> findByLevelName(String levelName);

    // Find by level name containing (case-insensitive)
    List<Form5SelectLevel> findByLevelNameContainingIgnoreCase(String levelName);

    // Find by level code
    Optional<Form5SelectLevel> findByLevelCode(String levelCode);

    // Find all active levels
    List<Form5SelectLevel> findByIsActiveTrue();

    // Find by level value range
    List<Form5SelectLevel> findByLevelValueBetween(int minValue, int maxValue);

    // Custom JPQL query with join (assuming Form5SelectLevel has a parent relationship)
    @Query("SELECT l FROM Form5SelectLevel l JOIN l.parent p WHERE p.id = :parentId")
    List<Form5SelectLevel> findByParentId(@Param("parentId") Long parentId);

    // Native query for complex operations
    @Query(value = "SELECT * FROM form5_select_level WHERE level_value > :minValue ORDER BY level_name", nativeQuery = true)
    List<Form5SelectLevel> findAboveValueOrdered(@Param("minValue") int minValue);

    // Projection query returning only specific fields
    @Query("SELECT new com.java.coreTemplate.model.dto.Form5SelectLevel(l.id, l.levelName) FROM Form5SelectLevel l WHERE l.isActive = true")
    List<Form5SelectLevel> findActiveLevelNames();

    // Using JPA Specifications (would need additional support class)
    // List<Form5SelectLevel> findAll(Specification<Form5SelectLevel> spec);

    // Find by multiple criteria using derived query
    List<Form5SelectLevel> findByLevelNameAndLevelValueGreaterThan(String levelName, int minValue);

    // Update query using @Modifying
    @Modifying
    @Query("UPDATE Form5SelectLevel l SET l.isActive = false WHERE l.levelValue < :minValue")
    int deactivateBelowValue(@Param("minValue") int minValue);
}